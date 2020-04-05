import { BedAvailability, Hospital, MapData, Repository as RepositoryI } from '../types';

export class Repository implements RepositoryI {
    addHospital(): Promise<{}> {
        return Promise.reject(new Error("Method not implemented."));
    }
    getBedAvailability(): Promise<BedAvailability[]> {
        return Promise.reject(new Error("Method not implemented."));
    }
    getBedAvailabilityLatest(): Promise<BedAvailability> {
        return Promise.reject(new Error("Method not implemented."));
    }
    getHospitals(): Promise<Hospital[]> {
        return Promise.reject(new Error("Method not implemented."));
    }
    getHospitalById(id: number): Promise<Hospital> {
        if(id === 1234) {
            return Promise.resolve({
                id:1234,
                name:'Example',
                address:{
                    state: 'Kanton Zurich',
                    city: 'Zürich',
                    postcode: '8091',
                    street: 'Rämistrasse',
                    streetNumber: 100
                },
                phoneNumber:'01531931531',
                website:'example.ch',
                location:{
                    longitude: 15.1234,
                    latitude: 27.2713
                }
            });
        }
        return Promise.reject(new Error('No such hospital'));
    }
    getMapData({date}): Promise<MapData> {
        return Promise.reject(new Error("Method not implemented."));
    }
}
