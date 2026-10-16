import { CHAIN } from "next-common/utils/constants";
import getChainSettings from "next-common/utils/consts/settings";

// Features a chain's backend does not serve, listed in its `hiddenFeatures` setting
export default function isFeatureHidden(feature) {
  return (getChainSettings(CHAIN).hiddenFeatures || []).includes(feature);
}
