import axios from 'axios';
import { useState } from 'react';

function useFetchData(apiEndpoint) {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }
        setLoading(true);

        const fetchAllData = async () => {
            try {
                const result = await axios.get(apiEndpoint);
                const allData = result.data;
                setAllData(allData);
                setLoading(false);
            } catch (error) {
                console.error('error fetching data: ', error);
                setLoading(false);
            }
        };

        if (apiEndpoint) {
            fetchAllData();
        }
    }, [initialLoad, apiEndpoint]);
    return { allData, loading };
}

export default useFetchData;
