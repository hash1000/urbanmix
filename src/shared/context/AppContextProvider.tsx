import React, { createContext, useEffect, useState } from 'react';

import { ApartmentData } from '@/shared/data/firebase/fakeApartmentData';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

import '@/shared/data/firebase/firebase.tsx';

export const AppContextProvider = createContext({
  apartmentData: [] as ApartmentData[],
  setApartmentData: (() => {}) as React.Dispatch<
    React.SetStateAction<ApartmentData[]>
  >,
  updateApartmentsDB: (() => {}) as (newData: ApartmentData[]) => void,
});

export const AppContext = () => {
  const [apartmentData, setApartmentData] = useState<ApartmentData[]>([]);
  const docRef = doc(getFirestore(), 'data', 'building1');
  useEffect(() => {
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data) {
            setApartmentData(data.data as ApartmentData[]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateApartmentsDB = async (newData: ApartmentData[]) => {
    const dataToUpdate = newData.map((apartment) => {
      return { name: apartment.name, state: apartment.state || 0 };
    });
    await setDoc(docRef, { data: dataToUpdate });
  };

  return { value: { apartmentData, setApartmentData, updateApartmentsDB } };
};
