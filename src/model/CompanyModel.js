import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const CompanyModel = () => {
    const [formData, formDataSet] = useState();
    const [ch_listData, ch_listDataSet] = useState(0);
    
    

    const print = useCallback(() => {
        console.log("모델", formData);
    }, [formData]);



    return { formData, formDataSet, ch_listData, ch_listDataSet };
};

export default CompanyModel;