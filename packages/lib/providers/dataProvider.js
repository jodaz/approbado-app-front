import apiClient from '@jodaz_/data-provider';
import CONFIG_NAMES from '@approbado/lib/env'

const providers = apiClient(`${CONFIG_NAMES.API}`, {
  offsetPageNum: -1,
}, `${CONFIG_NAMES.AUTH_TOKEN}`);

export const dataProvider = providers.endpoints;

export const axios = providers.client;
