import { useState, useEffect } from 'react';
import { BoxData } from './boxData';

export function useSubjectData(selectedFile: string) {
    const [data, setData] = useState<BoxData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://raw.githubusercontent.com/ronnapatp/cudElective/main/data/json/${selectedFile}.json`);
                if (!response.ok) throw new Error('Failed to fetch data');

                let jsonData: BoxData[] = await response.json();

                // Sort by subject code
                jsonData.sort((a, b) => {
                    const subjectA = a.code.charAt(0);
                    const subjectB = b.code.charAt(0);
                    return subjectA < subjectB ? -1 : (subjectA > subjectB ? 1 : 0);
                });

                setData(jsonData);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedFile]);

    return { data, loading, error };
}
