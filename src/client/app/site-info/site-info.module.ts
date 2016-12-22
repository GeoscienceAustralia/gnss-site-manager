import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';
import { ResponsiblePartyModule } from '../responsible-party/responsible-party.module';
import { GnssReceiverInfoModule } from '../gnss-receiver-info/gnss-receiver-info.module';
import { GnssAntennaModule } from '../gnss-antenna/gnss-antenna.module';
import { SurveyedLocalTiesModule } from '../surveyed-local-ties/surveyed-local-ties.module';
import { FrequencyStandardModule } from '../frequency-standard/frequency-standard.module';
import { EpisodicEffectModule } from '../episodic-effect/episodic-effect.module';
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
    GnssReceiverInfoModule,
    GnssAntennaModule,
    SurveyedLocalTiesModule,
    DatetimePickerModule,
    HumiditySensorModule,
    PressureSensorModule,
    TemperatureSensorModule,
    WaterVaporSensorModule,
    EpisodicEffectModule,
    FrequencyStandardModule
  ],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})

export class SiteInfoModule { }
