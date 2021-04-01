import { Powergate } from '../pin/powergate';

export class GeoUtils {
    static async getPowergateInstance(host: string, token?: string): Promise<Powergate> {
        try {
            if (token) {
                const powergate: Powergate = await Powergate.build(host, token);
                return powergate;
            } else {
                const powergate: Powergate = await Powergate.build(host);
                return powergate;
            }
        } catch (e) {
            throw e;
        }
    }
}
