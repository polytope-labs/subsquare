import getChainSettings from "./consts/settings";
import { CHAIN } from "./constants";

export function getStatescanDomain(chain) {
  const { integrations } = getChainSettings(chain);

  if (!integrations?.statescan) {
    return null;
  }

  const domain = integrations.statescan.domain || chain;

  return domain;
}

export function getStatescanApiDomain(chain) {
  const { integrations } = getChainSettings(chain);

  if (!integrations?.statescan) {
    return null;
  }

  const apiDomain =
    integrations.statescan.apiDomain || integrations.statescan.domain || chain;

  return apiDomain;
}

// A chain that runs its own Statescan sets `url`, `apiUrl` and `graphqlUrl` in its statescan integration.
// Links to any other domain go to the hosted statescan.io.
function ownStatescan() {
  const statescan = getChainSettings(CHAIN)?.integrations?.statescan;
  return { ...statescan, domain: statescan?.domain || CHAIN };
}

export function getStatescanUrl(domain) {
  const own = ownStatescan();
  if (own.url && domain === own.domain) {
    return own.url.replace(/\/$/, "");
  }
  return `https://${domain}.statescan.io`;
}

export function getStatescanRestUrl(apiDomain) {
  const own = ownStatescan();
  if (own.apiUrl && apiDomain === (own.apiDomain || own.domain)) {
    return own.apiUrl.replace(/\/$/, "");
  }
  return `https://${apiDomain}-api.statescan.io`;
}

export function getStatescanGraphqlUrl() {
  return ownStatescan().graphqlUrl || null;
}
