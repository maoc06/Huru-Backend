import { OAuth2Client } from 'google-auth-library';

import { config } from '../../config';

const oAuth2Client = new OAuth2Client({ clientId: config.googleClientId });

export default { oAuth2Client };
