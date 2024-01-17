const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

// const carSummarySchema = joi.object({
//   car_image: joi.object({
//     exterior_image: joi.array().items(
//       joi.object({
//         actual_name: joi.string().allow(null, "").optional(),
//         internal_name: joi.string().allow(null, "").optional(),
//       })
//     ),
//     interior_image: joi.array().items(
//       joi.object({
//         actual_name: joi.string().allow(null, "").optional(),
//         internal_name: joi.string().allow(null, "").optional(),
//       })
//     ),
//   }),
//   car_name: joi.string().allow(null, "").optional(),
//   price: joi.number(),
//   reg_year: joi.number(),
//   fuel_type: joi.string().allow(null, "").optional(),
//   kms: joi.number(),
//   reg_state: joi.string().allow(null, "").optional(),
// });

// const overviewSchema = joi.object({
//   vin: joi.string().allow(null, "").optional(),
//   make: joi.string().allow(null, "").optional(),
//   model: joi.string().allow(null, "").optional(),
//   exterior_colour: joi.string().allow(null, "").optional(),
//   engine: joi.string().allow(null, "").optional(),
//   transmission: joi.string().allow(null, "").optional(),
//   ownership: joi.string().allow(null, "").optional(),
//   peak_torque: joi.string().allow(null, "").optional(),
//   peak_power: joi.string().allow(null, "").optional(),
//   doors: joi.number(),
//   drive: joi.number(),
//   seating_capacity: joi.number(),
//   manufacturing_year: joi.number(),
// });

// const engineAndTransmissionSchema = joi.object({
//   engine_displacement: joi.string().allow(null, "").optional(),
//   power_figure: joi.string().allow(null, "").optional(),
//   torque_figure: joi.string().allow(null, "").optional(),
//   drivetrain: joi.string().allow(null, "").optional(),
//   transmission: joi.string().allow(null, "").optional(),
// });

// const hybridSystemSchema = joi.object({
//   e_motor_type_size: joi.string().allow(null, "").optional(),
//   power_figure: joi.string().allow(null, "").optional(),
//   torque_figure: joi.string().allow(null, "").optional(),
//   combined_power_torque: joi.string().allow(null, "").optional(),
// });

// const performanceEfficiencySchema = joi.object({
//   eco_start_stop_system: joi.string().allow(null, "").optional(),
//   driving_modes: joi.string().allow(null, "").optional(),
//   terrain_response_mode: joi.string().allow(null, "").optional(),
//   active_aerodynamics: joi.string().allow(null, "").optional(),
//   exhaust_system_type: joi.string().allow(null, "").optional(),
//   rear_axle_steering: joi.string().allow(null, "").optional(),
//   acceleration: joi.string().allow(null, "").optional(),
//   top_speed: joi.number(),
//   fuel_type: joi.string().allow(null, "").optional(),
//   fuel_consumption: joi.number(),
//   emission_std: joi.string().allow(null, "").optional(),
// });

// const exteriorEquipmentSchema = joi.object({
//   head_lamps: joi.string().allow(null, "").optional(),
//   head_lamp_washer: joi.string().allow(null, "").optional(),
//   drls: joi.string().allow(null, "").optional(),
//   fog_lamps: joi.string().allow(null, "").optional(),
//   cornering_lamps: joi.string().allow(null, "").optional(),
//   follow_me_home_lamps: joi.string().allow(null, "").optional(),
//   rain_sensing_wipers: joi.string().allow(null, "").optional(),
//   orvm_electrically_adjustable_retractable: joi.string().allow(null, "").optional(),
//   puddle_lamps: joi.string().allow(null, "").optional(),
//   heat_protecting_glazing_windows: joi.string().allow(null, "").optional(),
//   frameless_doors: joi.string().allow(null, "").optional(),
//   soft_close_doors: joi.string().allow(null, "").optional(),
//   central_locking: joi.string().allow(null, "").optional(),
//   integrated_roof_rails: joi.string().allow(null, "").optional(),
//   glass_sunroof: joi.string().allow(null, "").optional(),
//   tail_lamps: joi.string().allow(null, "").optional(),
//   third_brake_light: joi.string().allow(null, "").optional(),
//   rear_wipers: joi.string().allow(null, "").optional(),
//   defogger: joi.string().allow(null, "").optional(),
//   power_boot_lid_opening: joi.string().allow(null, "").optional(),
//   side_foot_step: joi.string().allow(null, "").optional(),
//   rear_diffuser: joi.string().allow(null, "").optional(),
//   rear_spoiler: joi.string().allow(null, "").optional(),
//   exhaust_tips: joi.string().allow(null, "").optional(),
//   convertible_roof: joi.string().allow(null, "").optional(),
//   easy_access_boot_opener: joi.string().allow(null, "").optional(),
//   digital_display_key: joi.string().allow(null, "").optional(),
//   sports_assisted_key_band: joi.string().allow(null, "").optional(),
// });

// const interiorEquipmentSchema = joi.object({
//   gear_knob: joi.string().allow(null, "").optional(),
//   side_sill_moulding: joi.string().allow(null, "").optional(),
//   keyless_start_stop: joi.string().allow(null, "").optional(),
//   climate_control_system: joi.string().allow(null, "").optional(),
//   heater: joi.string().allow(null, "").optional(),
//   vanity_mirror: joi.string().allow(null, "").optional(),
//   cabin_lamps: joi.string().allow(null, "").optional(),
//   analog_clock: joi.string().allow(null, "").optional(),
//   front_armrest: joi.string().allow(null, "").optional(),
//   cupholders: joi.string().allow(null, "").optional(),
//   cool_glove_box: joi.string().allow(null, "").optional(),
//   rear_armrest: joi.string().allow(null, "").optional(),
//   rear_refrigerator: joi.string().allow(null, "").optional(),
//   smokers_package: joi.string().allow(null, "").optional(),
//   in_car_wifi: joi.string().allow(null, "").optional(),
//   ambient_lighting: joi.string().allow(null, "").optional(),
//   wireless_charging: joi.string().allow(null, "").optional(),
//   power_socket: joi.string().allow(null, "").optional(),
//   usb_aux: joi.string().allow(null, "").optional(),
//   auto_dimming_irvm: joi.string().allow(null, "").optional(),
//   auto_dimming_orvm: joi.string().allow(null, "").optional(),
//   power_windows: joi.string().allow(null, "").optional(),
//   rear_windows_blind: joi.string().allow(null, "").optional(),
//   rear_windshield_blind: joi.string().allow(null, "").optional(),
//   boot_lid_opener: joi.string().allow(null, "").optional(),
//   child_safety_lock: joi.string().allow(null, "").optional(),
//   steering_wheel: joi.string().allow(null, "").optional(),
//   steering_wheels_equipment: joi.string().allow(null, "").optional(),
//   heated_steering_wheel: joi.string().allow(null, "").optional(),
//   steering_wheel_adjustment: joi.string().allow(null, "").optional(),
//   paddle_shifters: joi.string().allow(null, "").optional(),
//   heads_up_display: joi.string().allow(null, "").optional(),
//   electric_handbrake: joi.string().allow(null, "").optional(),
//   instrument_cluster: joi.string().allow(null, "").optional(),
//   speedometer: joi.string().allow(null, "").optional(),
//   tachometer: joi.string().allow(null, "").optional(),
//   fuel_gauge: joi.string().allow(null, "").optional(),
//   engine_tem_gauge: joi.string().allow(null, "").optional(),
//   mid: joi.string().allow(null, "").optional(),
//   digital_speed: joi.string().allow(null, "").optional(),
//   gear_position_indicator: joi.string().allow(null, "").optional(),
//   gear_shifting_indicator: joi.string().allow(null, "").optional(),
//   electric_handbrake: joi.string().allow(null, "").optional(),
//   instrument_cluster: joi.string().allow(null, "").optional(),
//   trip_meter: joi.string().allow(null, "").optional(),
//   average_speed: joi.string().allow(null, "").optional(),
//   average_fuel_consumption: joi.string().allow(null, "").optional(),
//   realtime_fuel_consumption: joi.string().allow(null, "").optional(),
//   fuel_range: joi.string().allow(null, "").optional(),
//   low_fuel_warning: joi.string().allow(null, "").optional(),
//   door_ajar_warning: joi.string().allow(null, "").optional(),
//   glass_roof: joi.string().allow(null, "").optional(),
//   emergency_spare_wheel: joi.string().allow(null, "").optional(),
// });

// const suspensionBrakesWheelsTyresSchema = joi.object({
//   front_suspension: joi.string().allow(null, "").optional(),
//   rear_suspension: joi.string().allow(null, "").optional(),
//   front_brakes: joi.string().allow(null, "").optional(),
//   rear_brakes: joi.string().allow(null, "").optional(),
//   exhaust_system_type: joi.string().allow(null, "").optional(),
//   front_wheels_tyres: joi.string().allow(null, "").optional(),
// });

// const dimensionsWeightStorageCapacitySchema = joi.object({
//   length: joi.number(),
//   width: joi.number(),
//   height: joi.number(),
//   wheelbase: joi.number(),
//   front_track: joi.number(),
//   rear_track: joi.number(),
//   ground_clearance: joi.string().allow(null, "").optional(),
//   doors: joi.string().allow(null, "").optional(),
//   seating_capacity: joi.string().allow(null, "").optional(),
//   rows: joi.string().allow(null, "").optional(),
//   kerb_weight: joi.number(),
//   bootspace: joi.number(),
//   fuel_capacity: joi.number(),
// });

// const entertainmentRearSchema = joi.object({
//   screens: joi.number(),
//   input_ports: joi.string().allow(null, "").optional(),
//   other_equipments: joi.string().allow(null, "").optional(),
// });

// const seatsUpholsterySchema = joi.object({
//   front_seats: joi.string().allow(null, "").optional(),
//   comfort_driver_seat: joi.string().allow(null, "").optional(),
//   comfort_co_driver_seat: joi.string().allow(null, "").optional(),
//   electric_lumbar_support_driver_seat: joi.string().allow(null, "").optional(),
//   electric_lumbar_support_co_driver_seat: joi.string().allow(null, "").optional(),
//   powered_height_adjustment_driver_seat: joi.string().allow(null, "").optional(),
//   powered_height_adjustment_co_driver_seat: joi.string().allow(null, "").optional(),
//   powered_underthigh_extension_driver_seat: joi.string().allow(null, "").optional(),
//   powered_underthigh_extension_co_driver_seat: joi.string().allow(null, "").optional(),
//   powered_headrest_driver_seat: joi.string().allow(null, "").optional(),
//   powered_headrest_co_driver_seat: joi.string().allow(null, "").optional(),
//   ventilated_front_seats: joi.string().allow(null, "").optional(),
//   heated_front_seats: joi.string().allow(null, "").optional(),
//   front_seat_massage: joi.string().allow(null, "").optional(),
//   rear_seats: joi.string().allow(null, "").optional(),
//   comfort_seats: joi.string().allow(null, "").optional(),
//   electric_lumbar_support: joi.string().allow(null, "").optional(),
//   powered_side_bolsters: joi.string().allow(null, "").optional(),
//   powered_underthigh_extension: joi.string().allow(null, "").optional(),
//   powered_headrest: joi.string().allow(null, "").optional(),
//   ventilated_seats: joi.string().allow(null, "").optional(),
//   heated_seats: joi.string().allow(null, "").optional(),
//   seat_massage: joi.string().allow(null, "").optional(),
//   executive_lounge_seating: joi.string().allow(null, "").optional(),
//   gentlemen_function: joi.string().allow(null, "").optional(),
//   interior_upholstery: joi.string().allow(null, "").optional(),
//   headliner: joi.string().allow(null, "").optional(),
//   seat_belt: joi.string().allow(null, "").optional(),
//   second_row: joi.string().allow(null, "").optional(),
//   third_row: joi.string().allow(null, "").optional(),
// });

// const safetyEquipmentsSchema = joi.object({
//   airbags: joi.number(),
//   abs: joi.string().allow(null, "").optional(),
//   ebd: joi.string().allow(null, "").optional(),
//   ba: joi.string().allow(null, "").optional(),
//   esp: joi.string().allow(null, "").optional(),
//   tc: joi.string().allow(null, "").optional(),
//   tmpts: joi.string().allow(null, "").optional(),
//   hill_hold_assist: joi.string().allow(null, "").optional(),
//   blind_spot_assist: joi.string().allow(null, "").optional(),
//   lane_keep_assist: joi.string().allow(null, "").optional(),
//   seat_belt_warning: joi.string().allow(null, "").optional(),
//   cruise_control: joi.string().allow(null, "").optional(),
//   limited_slip_differential: joi.string().allow(null, "").optional(),
//   parking_sensors: joi.string().allow(null, "").optional(),
//   reverse_camera: joi.string().allow(null, "").optional(),
//   _360_aerial_view_panoramic_view: joi.string().allow(null, "").optional(),
//   parking_assistance: joi.string().allow(null, "").optional(),
//   remote_parking: joi.string().allow(null, "").optional(),
//   remote_central_locking: joi.string().allow(null, "").optional(),
//   regenerative_braking: joi.string().allow(null, "").optional(),
//   seat_belt_pretensioners: joi.string().allow(null, "").optional(),
//   night_vision: joi.string().allow(null, "").optional(),
//   cornering_brake_control: joi.string().allow(null, "").optional(),
//   electric_parking_brake: joi.string().allow(null, "").optional(),
//   vehicle_immobiliser: joi.string().allow(null, "").optional(),
//   isofix_child_seat_mounting: joi.string().allow(null, "").optional(),
//   speed_sensing_door_locks: joi.string().allow(null, "").optional(),
//   emergency_rear_brake_light: joi.string().allow(null, "").optional(),
//   chassis_construction: joi.string().allow(null, "").optional(),
//   body_construction: joi.string().allow(null, "").optional(),
//   dual_popup_roll_bars_in_convertibles: joi.string().allow(null, "").optional(),
//   popup_hood_during_frontal_collision: joi.string().allow(null, "").optional(),
//   other_safety_equipments: joi.string().allow(null, "").optional(),
// });

// const entertainmentFrontSchema = joi.object({
//   hd_colour_display: joi.string().allow(null, "").optional(),
//   in_built_hard_drive: joi.string().allow(null, "").optional(),
//   cd_dvd_player: joi.string().allow(null, "").optional(),
//   am_fm_radio: joi.string().allow(null, "").optional(),
//   bluetooth_connectivity: joi.string().allow(null, "").optional(),
//   music_system_power_output: joi.string().allow(null, "").optional(),
//   no_of_speakers: joi.number(),
//   apple_carplay: joi.string().allow(null, "").optional(),
//   android_auto: joi.string().allow(null, "").optional(),
//   gps_navigation: joi.string().allow(null, "").optional(),
//   in_built_convenience_apps: joi.string().allow(null, "").optional(),
//   enhanced_voice_control: joi.string().allow(null, "").optional(),
//   gesture_control: joi.string().allow(null, "").optional(),
//   touchpad_rotary_controller: joi.string().allow(null, "").optional(),
//   other_equipments: joi.string().allow(null, "").optional(),
// });

// const warrantyServicePackageSchema = joi.object({
//   warranty: joi.string().allow(null, "").optional(),
//   service_package_with_details: joi.string().allow(null, "").optional(),
// });

// const exteriorColoursSchema = joi.object({
//   exterior_colours: joi.string().allow(null, "").optional(),
// });

// module.exports.addSchema = {
//   body: joi.object().keys({
//     car_summary: carSummarySchema,
//     overview: overviewSchema,
//     engine_and_transmission: engineAndTransmissionSchema,
//     hybrid_system: hybridSystemSchema,
//     performance_efficiency: performanceEfficiencySchema,
//     exterior_equipment: exteriorEquipmentSchema,
//     interior_equipment: interiorEquipmentSchema,
//     suspension_brakes_wheels_tyres: suspensionBrakesWheelsTyresSchema,
//     dimensions_weight_storage_capacity: dimensionsWeightStorageCapacitySchema,
//     entertainment_rear: entertainmentRearSchema,
//     seats_upholstery: seatsUpholsterySchema,
//     safety_equipments: safetyEquipmentsSchema,
//     entertainment_front: entertainmentFrontSchema,
//     warranty_service_package: warrantyServicePackageSchema,
//     exterior_colours: exteriorColoursSchema,
//     status: joi
//       .string()
//       .valid("draft", "submitted", "ready_for_sell", "reserved", "soldout")
//       .required(),
//     user_id: joi.string().allow(null, "").optional(),
//   }),
// };

// Interior Image Schema
const interiorImageSchema = joi.object({
  actual_name: joi.string().allow(null, "").optional(),
  internal_name: joi.string().allow(null, "").optional(),
});

// Car Image Schema
const carImageSchema = joi.object({
  exterior_image: joi.array().items(interiorImageSchema),
  interior_image: joi.array().items(interiorImageSchema),
});

// Car Summary Schema
const carSummarySchema = joi.object({
  car_image: carImageSchema,
  car_name: joi.string().allow(null, "").optional(),
  price: joi.string().allow(null, "").optional(),
  reg_year: joi.string().allow(null, "").optional(),
  fuel_type: joi.string().allow(null, "").optional(),
  kms: joi.string().allow(null, "").optional(),
  reg_state: joi.string().allow(null, "").optional(),
});

// Overview Schema
const overviewSchema = joi.object({
  vin: joi.string().allow(null, "").optional(),
  make: joi.string().allow(null, "").optional(),
  model: joi.string().allow(null, "").optional(),
  exterior_colour: joi.string().allow(null, "").optional(),
  engine: joi.string().allow(null, "").optional(),
  transmission: joi.string().allow(null, "").optional(),
  ownership: joi.string().allow(null, "").optional(),
  peak_torque: joi.string().allow(null, "").optional(),
  peak_power: joi.string().allow(null, "").optional(),
  doors: joi.string().allow(null, "").optional(),
  drive: joi.string().allow(null, "").optional(),
  seating_capacity: joi.string().allow(null, "").optional(),
  manufacturing_year: joi.string().allow(null, "").optional(),
});

// Engine and Transmission Schema
const engineAndTransmissionSchema = joi.object({
  engine_displacement: joi.string().allow(null, "").optional(),
  power_figure: joi.string().allow(null, "").optional(),
  torque_figure: joi.string().allow(null, "").optional(),
  drivetrain: joi.string().allow(null, "").optional(),
  transmission: joi.string().allow(null, "").optional(),
});

// Hybrid System Schema
const hybridSystemSchema = joi.object({
  e_motor_type_size: joi.string().allow(null, "").optional(),
  power_figure: joi.string().allow(null, "").optional(),
  torque_figure: joi.string().allow(null, "").optional(),
  combined_power_torque: joi.string().allow(null, "").optional(),
});

// Performance Efficiency Schema
const performanceEfficiencySchema = joi.object({
  eco_start_stop_system: joi.string().allow(null, "").optional(),
  driving_modes: joi.string().allow(null, "").optional(),
  terrain_response_mode: joi.string().allow(null, "").optional(),
  active_aerodynamics: joi.string().allow(null, "").optional(),
  exhaust_system_type: joi.string().allow(null, "").optional(),
  rear_axle_steering: joi.string().allow(null, "").optional(),
  acceleration: joi.string().allow(null, "").optional(),
  top_speed: joi.string().allow(null, "").optional(),
  fuel_type: joi.string().allow(null, "").optional(),
  fuel_consumption: joi.string().allow(null, "").optional(),
  emission_std: joi.string().allow(null, "").optional(),
});

// Exterior Equipment Schema
const exteriorEquipmentSchema = joi.object({
  head_lamps: joi.string().allow(null, "").optional(),
  head_lamp_washer: joi.string().allow(null, "").optional(),
  drls: joi.string().allow(null, "").optional(),
  fog_lamps: joi.string().allow(null, "").optional(),
  cornering_lamps: joi.string().allow(null, "").optional(),
  follow_me_home_lamps: joi.string().allow(null, "").optional(),
  rain_sensing_wipers: joi.string().allow(null, "").optional(),
  orvm_electrically_adjustable_retractable: joi.string().allow(null, "").optional(),
  puddle_lamps: joi.string().allow(null, "").optional(),
  heat_protecting_glazing_windows: joi.string().allow(null, "").optional(),
  frameless_doors: joi.string().allow(null, "").optional(),
  soft_close_doors: joi.string().allow(null, "").optional(),
  central_locking: joi.string().allow(null, "").optional(),
  integrated_roof_rails: joi.string().allow(null, "").optional(),
  glass_sunroof: joi.string().allow(null, "").optional(),
  tail_lamps: joi.string().allow(null, "").optional(),
  third_brake_light: joi.string().allow(null, "").optional(),
  rear_wipers: joi.string().allow(null, "").optional(),
  defogger: joi.string().allow(null, "").optional(),
  power_boot_lid_opening: joi.string().allow(null, "").optional(),
  side_foot_step: joi.string().allow(null, "").optional(),
  rear_diffuser: joi.string().allow(null, "").optional(),
  rear_spoiler: joi.string().allow(null, "").optional(),
  exhaust_tips: joi.string().allow(null, "").optional(),
  convertible_roof: joi.string().allow(null, "").optional(),
  easy_access_boot_opener: joi.string().allow(null, "").optional(),
  digital_display_key: joi.string().allow(null, "").optional(),
  sports_assisted_key_band: joi.string().allow(null, "").optional(),
});

// Interior Equipment Schema
const interiorEquipmentSchema = joi.object({
  gear_knob: joi.string().allow(null, "").optional(),
  side_sill_moulding: joi.string().allow(null, "").optional(),
  keyless_start_stop: joi.string().allow(null, "").optional(),
  climate_control_system: joi.string().allow(null, "").optional(),
  heater: joi.string().allow(null, "").optional(),
  vanity_mirror: joi.string().allow(null, "").optional(),
  cabin_lamps: joi.string().allow(null, "").optional(),
  analog_clock: joi.string().allow(null, "").optional(),
  front_armrest: joi.string().allow(null, "").optional(),
  cupholders: joi.string().allow(null, "").optional(),
  cool_glove_box: joi.string().allow(null, "").optional(),
  rear_armrest: joi.string().allow(null, "").optional(),
  rear_refrigerator: joi.string().allow(null, "").optional(),
  smokers_package: joi.string().allow(null, "").optional(),
  incar_wifi: joi.string().allow(null, "").optional(),
  ambient_lighting: joi.string().allow(null, "").optional(),
  wireless_charging: joi.string().allow(null, "").optional(),
  power_socket: joi.string().allow(null, "").optional(),
  usb_aux: joi.string().allow(null, "").optional(),
  auto_dimming_irvm: joi.string().allow(null, "").optional(),
  auto_dimming_orvm: joi.string().allow(null, "").optional(),
  power_windows: joi.string().allow(null, "").optional(),
  rear_windows_blind: joi.string().allow(null, "").optional(),
  rear_windshield_blind: joi.string().allow(null, "").optional(),
  boot_lid_opener: joi.string().allow(null, "").optional(),
  child_safety_lock: joi.string().allow(null, "").optional(),
  steering_wheel: joi.string().allow(null, "").optional(),
  steering_wheels_equipment: joi.string().allow(null, "").optional(),
  steering_wheel_adjustment: joi.string().allow(null, "").optional(),
  paddle_shifters: joi.string().allow(null, "").optional(),
  heads_up_display: joi.string().allow(null, "").optional(),
  electric_handbrake: joi.string().allow(null, "").optional(),
  instrument_cluster: joi.string().allow(null, "").optional(),
  speedometer: joi.string().allow(null, "").optional(),
  tachometer: joi.string().allow(null, "").optional(),
  fuel_gauge: joi.string().allow(null, "").optional(),
  engine_temp_gauge: joi.string().allow(null, "").optional(),
  mid: joi.string().allow(null, "").optional(),
  digital_speed: joi.string().allow(null, "").optional(),
  gear_position_indicator: joi.string().allow(null, "").optional(),
  gear_shifting_indicator: joi.string().allow(null, "").optional(),
  trip_meter: joi.string().allow(null, "").optional(),
  average_speed: joi.string().allow(null, "").optional(),
  average_fuel_consumption: joi.string().allow(null, "").optional(),
  realtime_fuel_consumption: joi.string().allow(null, "").optional(),
  fuel_range: joi.string().allow(null, "").optional(),
  low_fuel_warning: joi.string().allow(null, "").optional(),
  door_ajar_warning: joi.string().allow(null, "").optional(),
  glass_roof: joi.string().allow(null, "").optional(),
  emergency_spare_wheel: joi.string().allow(null, "").optional(),
});

// Suspension Brakes Wheels Tyres Schema
const suspensionBrakesWheelsTyresSchema = joi.object({
  front_suspension: joi.string().allow(null, "").optional(),
  rear_suspension: joi.string().allow(null, "").optional(),
  front_brakes: joi.string().allow(null, "").optional(),
  rear_brakes: joi.string().allow(null, "").optional(),
  exhaust_system_type: joi.string().allow(null, "").optional(),
  front_wheels_tyres: joi.string().allow(null, "").optional(),
});

// Dimensions Weight Storage Capacity Schema
const dimensionsWeightStorageCapacitySchema = joi.object({
  length: joi.string().allow(null, "").optional(),
  width: joi.string().allow(null, "").optional(),
  height: joi.string().allow(null, "").optional(),
  wheelbase: joi.string().allow(null, "").optional(),
  front_track: joi.string().allow(null, "").optional(),
  rear_track: joi.string().allow(null, "").optional(),
  ground_clearance: joi.string().allow(null, "").optional(),
  doors: joi.string().allow(null, "").optional(),
  seating_capacity: joi.string().allow(null, "").optional(),
  rows: joi.string().allow(null, "").optional(),
  kerb_weight: joi.string().allow(null, "").optional(),
  bootspace: joi.string().allow(null, "").optional(),
  fuel_capacity: joi.string().allow(null, "").optional(),
});

// Entertainment Rear Schema
const entertainmentRearSchema = joi.object({
  screens: joi.string().allow(null, "").optional(),
  input_ports: joi.string().allow(null, "").optional(),
  other_equipments: joi.string().allow(null, "").optional(),
});

// Seats Upholstery Schema
const seatsUpholsterySchema = joi.object({
  front_seats: joi.string().allow(null, "").optional(),
  comfort_driver_seat: joi.string().allow(null, "").optional(),
  comfort_co_driver_seat: joi.string().allow(null, "").optional(),
  electric_lumbar_support_driver_seat: joi.string().allow(null, "").optional(),
  electric_lumbar_support_co_driver_seat: joi.string().allow(null, "").optional(),
  powered_height_adjustment_driver_seat: joi.string().allow(null, "").optional(),
  powered_height_adjustment_co_driver_seat: joi.string().allow(null, "").optional(),
  powered_underthigh_extension_driver_seat: joi.string().allow(null, "").optional(),
  powered_underthigh_extension_co_driver_seat: joi.string().allow(null, "").optional(),
  powered_headrest_driver_seat: joi.string().allow(null, "").optional(),
  powered_headrest_co_driver_seat: joi.string().allow(null, "").optional(),
  ventilated_front_seats: joi.string().allow(null, "").optional(),
  heated_front_seats: joi.string().allow(null, "").optional(),
  front_seat_massage: joi.string().allow(null, "").optional(),
  rear_seats: joi.string().allow(null, "").optional(),
  comfort_seats: joi.string().allow(null, "").optional(),
  electric_lumbar_support: joi.string().allow(null, "").optional(),
  powered_side_bolsters: joi.string().allow(null, "").optional(),
  powered_underthigh_extension: joi.string().allow(null, "").optional(),
  powered_headrest: joi.string().allow(null, "").optional(),
  ventilated_seats: joi.string().allow(null, "").optional(),
  heated_seats: joi.string().allow(null, "").optional(),
  seat_massage: joi.string().allow(null, "").optional(),
  executive_lounge_seating: joi.string().allow(null, "").optional(),
  gentlemen_function: joi.string().allow(null, "").optional(),
  interior_upholstery: joi.string().allow(null, "").optional(),
  headliner: joi.string().allow(null, "").optional(),
  seat_belt: joi.string().allow(null, "").optional(),
  second_row: joi.string().allow(null, "").optional(),
  third_row: joi.string().allow(null, "").optional(),
});

// Safety Equipments Schema
const safetyEquipmentsSchema = joi.object({
  airbags: joi.string().allow(null, "").optional(),
  abs: joi.string().allow(null, "").optional(),
  ebd: joi.string().allow(null, "").optional(),
  ba: joi.string().allow(null, "").optional(),
  esp: joi.string().allow(null, "").optional(),
  tc: joi.string().allow(null, "").optional(),
  tmpts: joi.string().allow(null, "").optional(),
  hill_hold_assist: joi.string().allow(null, "").optional(),
  blind_spot_assist: joi.string().allow(null, "").optional(),
  lane_keep_assist: joi.string().allow(null, "").optional(),
  seat_belt_warning: joi.string().allow(null, "").optional(),
  cruise_control: joi.string().allow(null, "").optional(),
  limited_slip_differential: joi.string().allow(null, "").optional(),
  parking_sensors: joi.string().allow(null, "").optional(),
  reverse_camera: joi.string().allow(null, "").optional(),
  _360_aerial_view_panoramic_view: joi.string().allow(null, "").optional(),
  parking_assistance: joi.string().allow(null, "").optional(),
  remote_parking: joi.string().allow(null, "").optional(),
  remote_central_locking: joi.string().allow(null, "").optional(),
  regenerative_braking: joi.string().allow(null, "").optional(),
  seat_belt_pretensioners: joi.string().allow(null, "").optional(),
  night_vision: joi.string().allow(null, "").optional(),
  cornering_brake_control: joi.string().allow(null, "").optional(),
  electric_parking_brake: joi.string().allow(null, "").optional(),
  vehicle_immobiliser: joi.string().allow(null, "").optional(),
  isofix_child_seat_mounting: joi.string().allow(null, "").optional(),
  speed_sensing_door_locks: joi.string().allow(null, "").optional(),
  emergency_rear_brake_light: joi.string().allow(null, "").optional(),
  chassis_construction: joi.string().allow(null, "").optional(),
  body_construction: joi.string().allow(null, "").optional(),
  dual_popup_roll_bars_in_convertibles: joi.string().allow(null, "").optional(),
  popup_hood_during_frontal_collision: joi.string().allow(null, "").optional(),
  other_safety_equipments: joi.string().allow(null, "").optional(),
});

// Entertainment Front Schema
const entertainmentFrontSchema = joi.object({
  hd_colour_display: joi.string().allow(null, "").optional(),
  in_built_hard_drive: joi.string().allow(null, "").optional(),
  cd_dvd_player: joi.string().allow(null, "").optional(),
  am_fm_radio: joi.string().allow(null, "").optional(),
  bluetooth_connectivity: joi.string().allow(null, "").optional(),
  music_system_power_output: joi.string().allow(null, "").optional(),
  no_of_speakers: joi.string().allow(null, "").optional(),
  apple_carplay: joi.string().allow(null, "").optional(),
  android_auto: joi.string().allow(null, "").optional(),
  gps_navigation: joi.string().allow(null, "").optional(),
  in_built_convenience_apps: joi.string().allow(null, "").optional(),
  enhanced_voice_control: joi.string().allow(null, "").optional(),
  gesture_control: joi.string().allow(null, "").optional(),
  touchpad_rotary_controller: joi.string().allow(null, "").optional(),
  other_equipments: joi.string().allow(null, "").optional(),
});

// Warranty Service Package Schema
const warrantyServicePackageSchema = joi.object({
  warranty: joi.string().allow(null, "").optional(),
  service_package_with_details: joi.string().allow(null, "").optional(),
});

// Exterior Colours Schema
const exteriorColoursSchema = joi.object({
  exterior_colours: joi.string().allow(null, "").optional(),
});

module.exports.addSchema = {
  body: joi.object().keys({
    car_summary: carSummarySchema,
    overview: overviewSchema,
    engine_and_transmission: engineAndTransmissionSchema,
    hybrid_system: hybridSystemSchema,
    performance_efficiency: performanceEfficiencySchema,
    exterior_equipment: exteriorEquipmentSchema,
    interior_equipment: interiorEquipmentSchema,
    suspension_brakes_wheels_tyres: suspensionBrakesWheelsTyresSchema,
    dimensions_weight_storage_capacity: dimensionsWeightStorageCapacitySchema,
    entertainment_rear: entertainmentRearSchema,
    seats_upholstery: seatsUpholsterySchema,
    safety_equipments: safetyEquipmentsSchema,
    entertainment_front: entertainmentFrontSchema,
    warranty_service_package: warrantyServicePackageSchema,
    exterior_colours: exteriorColoursSchema,
    status: joi
      .string()
      .valid("draft", "submitted", "ready_for_sell", "reserved", "soldout")
      .required(),
    user_id: joi.string().allow(null, "").optional(),
  }),
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    status: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};

module.exports.deleteSchema = {
  body: {
    car_id: joi.string().required(),
  },
};

module.exports.updateSchema = {
  body: joi.object().keys({
    car_summary: carSummarySchema,
    overview: overviewSchema,
    engine_and_transmission: engineAndTransmissionSchema,
    hybrid_system: hybridSystemSchema,
    performance_efficiency: performanceEfficiencySchema,
    exterior_equipment: exteriorEquipmentSchema,
    interior_equipment: interiorEquipmentSchema,
    suspension_brakes_wheels_tyres: suspensionBrakesWheelsTyresSchema,
    dimensions_weight_storage_capacity: dimensionsWeightStorageCapacitySchema,
    entertainment_rear: entertainmentRearSchema,
    seats_upholstery: seatsUpholsterySchema,
    safety_equipments: safetyEquipmentsSchema,
    entertainment_front: entertainmentFrontSchema,
    warranty_service_package: warrantyServicePackageSchema,
    exterior_colours: exteriorColoursSchema,
    status: joi
      .string()
      .valid("draft", "submitted", "ready_for_sell", "reserved", "soldout")
      .required(),
    user_id: joi.string().allow(null, "").optional(),
  }),
  params: {
    car_id: joi.string().allow(null, "").optional(),
  },
};

module.exports.getUserCarDetail = {
  params: {
    car_id: joi.string().required(),
  },
};

module.exports.upload = {
  body: joi.object({
    file: joi.object({
      size: joi.number().max(5242880).required(), // 5MB in bytes
    }),
  }),
};

module.exports.fileDeleteSchema = {
  body: joi.object({
    file_url: joi.string().required(),
  }),
};
