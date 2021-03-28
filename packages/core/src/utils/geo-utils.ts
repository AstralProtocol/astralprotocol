import { Powergate } from '../pin/powergate';

export class GeoUtils {
    static async getPowergateInstance(token?: string): Promise<Powergate> {
        try{
            if (token) {
                const powergate: Powergate = await Powergate.build(token);
                return powergate;
            } else {
                const powergate: Powergate  = await Powergate.build();
                return powergate;
            }
        }catch(e){
            throw e;
        }
    }
}