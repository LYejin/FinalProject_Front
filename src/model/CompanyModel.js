import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const CompanyModel = () => {
    const [formData, formDataSet] = useState();
    const [listData, listDataSet] = useState();
    
    

    const print = useCallback(() => {
        console.log("모델", formData);
    }, [formData]);



    return { formData, formDataSet };
};

export default CompanyModel;