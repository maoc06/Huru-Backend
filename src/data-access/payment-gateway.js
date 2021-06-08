import fetch from 'node-fetch';

import { config } from '../../config';
import { paymentUser } from './models/payment';

export default function makePaymentGateway({ client }) {
  const paymentGateway = config.payBaseUrl;

  async function generateAcceptanceToken() {
    const response = await fetch(
      `${paymentGateway}/merchants/${config.payPublicKey}`,
      { method: 'GET' }
    );
    const data = await response.json();
    return data.data.presigned_acceptance;
  }

  async function tokenizationSourceCard(cardInfo) {
    const response = await fetch(`${paymentGateway}/tokens/cards`, {
      method: 'POST',
      body: JSON.stringify(cardInfo),
      headers: { Authorization: `Bearer ${config.payPublicKey}` },
    });
    const data = await response.json();
    return data;
  }

  async function tokenizationSourceNequi(nequiInfo) {
    const response = await fetch(`${paymentGateway}/tokens/nequi`, {
      method: 'POST',
      body: JSON.stringify(nequiInfo),
      headers: { Authorization: `Bearer ${config.payPublicKey}` },
    });
    const data = await response.json();
    return data;
  }

  async function createPaymentSource(type, token, email, acceptanceToken) {
    const response = await fetch(`${paymentGateway}/payment_sources`, {
      method: 'POST',
      body: JSON.stringify({
        type,
        token,
        customer_email: email,
        acceptance_token: acceptanceToken,
      }),
      headers: { Authorization: `Bearer ${config.payPrivateKey}` },
    });
    const data = await response.json();
    return data;
  }

  async function insertSourceCard(sourceInfo) {
    const cardSourceInfo = {
      number: sourceInfo.number,
      exp_month: sourceInfo.exp_month,
      exp_year: sourceInfo.exp_year,
      cvc: sourceInfo.cvc,
      card_holder: sourceInfo.card_holder,
    };

    // First get the acceptance token
    const {
      acceptance_token: acceptanceToken,
    } = await generateAcceptanceToken();

    // Second tokenizate card info
    const {
      data: { id: token, brand, last_four: lastFour },
    } = await tokenizationSourceCard(cardSourceInfo);

    // Then create a payment source
    const paymentSource = await createPaymentSource(
      'CARD',
      token,
      sourceInfo.email,
      acceptanceToken
    );

    // Finally save the record in the database
    const paymentUserModel = paymentUser({ client });
    const paymentUserRecord = {
      id: paymentSource.data.id,
      addedBy: sourceInfo.uid,
      type: paymentSource.data.type,
      brand,
      lastFour,
      customerEmail: sourceInfo.email,
      phone: null,
      status: 1,
    };

    // but...first decide if default or not
    const paymentMethodByUser = await paymentUserModel.findAll({
      where: { addedBy: sourceInfo.uid },
    });
    if (paymentMethodByUser.length === 0) {
      paymentUserRecord.isDefault = true;
    }

    const response = await paymentUserModel.create(paymentUserRecord);

    return response.dataValues;
  }

  async function insertSourceNequi(sourceInfo) {
    const nequiSourceInfo = {
      phone_number: sourceInfo.phone,
    };

    // First get the acceptance token
    const {
      acceptance_token: acceptanceToken,
    } = await generateAcceptanceToken();

    // Second tokenizate card info
    const {
      data: { id: token },
    } = await tokenizationSourceNequi(nequiSourceInfo);

    // Then create a payment source
    const paymentSource = await createPaymentSource(
      'NEQUI',
      token,
      sourceInfo.email,
      acceptanceToken
    );

    // Finally save the record in the database
    const paymentUserModel = paymentUser({ client });
    const paymentUserRecord = {
      id: paymentSource.data.id,
      addedBy: sourceInfo.uid,
      type: paymentSource.data.type,
      brand: null,
      lastFour: null,
      customerEmail: sourceInfo.email,
      phone: sourceInfo.phone,
      status: 1,
    };

    // but...first decide if default or not
    const paymentMethodByUser = await paymentUserModel.findByUser(
      sourceInfo.uid
    );
    if (paymentMethodByUser.length === 0) {
      paymentUserRecord.isDefault = true;
    }

    const response = await paymentUserModel.create(paymentUserRecord);

    return response.dataValues;
  }

  async function makeTransaction(paymentInfo) {
    const payment = { ...paymentInfo };

    if (payment.payment_source_id === undefined) {
      const {
        acceptance_token: acceptanceToken,
      } = await generateAcceptanceToken();
      payment.acceptance_token = acceptanceToken;
    }

    const response = await fetch(`${paymentGateway}/transactions`, {
      method: 'POST',
      body: JSON.stringify(payment),
      headers: { Authorization: `Bearer ${config.payPrivateKey}` },
    });
    const data = await response.json();

    return data;
  }

  return Object.freeze({
    insertSourceCard,
    insertSourceNequi,
    makeTransaction,
  });
}
