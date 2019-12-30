export class CurrData {
    name: string;
    dt: any;    
    main:{
        temp: number;
        humidity: number;
    }    
    wind: {
        speed: number;
    }
    weather: [
        {
            main: string;
        }
    ]

}
