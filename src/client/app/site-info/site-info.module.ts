import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';
import { ResponsiblePartyModule } from '../responsible-party/responsible-party.module';
import { GnssReceiverModule } from '../gnss-receiver/gnss-receiver.module';
import { GnssAntennaModule } from '../gnss-antenna/gnss-antenna.module';
import { SurveyedLocalTieModule } from '../surveyed-local-tie/surveyed-local-tie.module';
import { FrequencyStandardModule } from '../frequency-standard/frequency-standard.module';
import { LocalEpisodicEffectModule } from '../local-episodic-effect/local-episodic-effect.module';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';
import { HumiditySensorModule } from '../humidity-sensor/humidity-sensor.module';
import { PressureSensorModule } from '../pressure-sensor/pressure-sensor.module';
import { TemperatureSensorModule } from '../temperature-sensor/temperature-sensor.module';
import { WaterVaporSensorModule } from '../water-vapor-sensor/water-vapor-sensor.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ResponsiblePartyModule,
    GnssReceiverModule,
    GnssAntennaModule,
    SurveyedLocalTieModule,
    FrequencyStandardModule,
    LocalEpisodicEffectModule,
    DatetimePickerModule,
    HumiditySensorModule,
    PressureSensorModule,
    TemperatureSensorModule,
    WaterVaporSensorModule,
  ],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})

export class SiteInfoModule { }
