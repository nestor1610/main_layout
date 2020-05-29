import { Setting } from "./setting";

export class Localization {
  id: number = 0;
  address: string = '';
  city_id = null;
  postal: string = '';
  state_id = null;
  country_id = null;

  constructor (setting: Setting = null) {
    if (setting !== null) {
      this.country_id = setting.country_id != null ? setting.country_id : null;
      this.state_id = setting.state_id != null ? setting.state_id : null;
      this.city_id = setting.city_id != null ? setting.city_id : null;
    }
  }
}