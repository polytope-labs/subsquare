import nextApi from "next-common/services/nextApi";
import { useEffect, useState, useMemo } from "react";
import useProfileAddress from "next-common/components/profile/useProfileAddress";

function useApiPath(pallet) {
  const address = useProfileAddress();

  const apiPath = useMemo(() => {
    if (!pallet || !address) {
      return null;
    }

    return `delegation/${pallet}/delegates/${address}`;
  }, [pallet, address]);

  return apiPath;
}

export default function useDelegationAnnouncement(pallet) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiPath = useApiPath(pallet);

  useEffect(() => {
    if (!apiPath) {
      return;
    }

    setIsLoading(true);

    nextApi
      .fetch(apiPath)
      .then(({ result }) => {
        if (result) {
          const { shortDescription, longDescription } = result?.manifesto || {};
          setData({ shortDescription, longDescription });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiPath]);

  return {
    data,
    isLoading,
  };
}
