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
//         actual_name: joi.string(),
//         internal_name: joi.string(),
//       })
//     ),
//     interior_image: joi.array().items(
//       joi.object({
//         actual_name: joi.string(),
//         internal_name: joi.string(),
//       })
//     ),
//   }),
//   car_name: joi.string(),
//   price: joi.number(),
//   reg_year: joi.number(),
//   fuel_type: joi.string(),
//   kms: joi.number(),
//   reg_state: joi.string(),
// });

// const overviewSchema = joi.object({
//   vin: joi.string(),
//   make: joi.string(),
//   model: joi.string(),
//   exterior_colour: joi.string(),
//   engine: joi.string(),
//   transmission: joi.string(),
//   ownership: joi.string(),
//   peak_torque: joi.string(),
//   peak_power: joi.string(),
//   doors: joi.number(),
//   drive: joi.number(),
//   seating_capacity: joi.number(),
//   manufacturing_year: joi.number(),
// });

// const engineAndTransmissionSchema = joi.object({
//   engine_displacement: joi.string(),
//   power_figure: joi.string(),
//   torque_figure: joi.string(),
//   drivetrain: joi.string(),
//   transmission: joi.string(),
// });

// const hybridSystemSchema = joi.object({
//   e_motor_type_size: joi.string(),
//   power_figure: joi.string(),
//   torque_figure: joi.string(),
//   combined_power_torque: joi.string(),
// });

// const performanceEfficiencySchema = joi.object({
//   eco_start_stop_system: joi.string(),
//   driving_modes: joi.string(),
//   terrain_response_mode: joi.string(),
//   active_aerodynamics: joi.string(),
//   exhaust_system_type: joi.string(),
//   rear_axle_steering: joi.string(),
//   acceleration: joi.string(),
//   top_speed: joi.number(),
//   fuel_type: joi.string(),
//   fuel_consumption: joi.number(),
//   emission_std: joi.string(),
// });

// const exteriorEquipmentSchema = joi.object({
//   head_lamps: joi.string(),
//   head_lamp_washer: joi.string(),
//   drls: joi.string(),
//   fog_lamps: joi.string(),
//   cornering_lamps: joi.string(),
//   follow_me_home_lamps: joi.string(),
//   rain_sensing_wipers: joi.string(),
//   orvm_electrically_adjustable_retractable: joi.string(),
//   puddle_lamps: joi.string(),
//   heat_protecting_glazing_windows: joi.string(),
//   frameless_doors: joi.string(),
//   soft_close_doors: joi.string(),
//   central_locking: joi.string(),
//   integrated_roof_rails: joi.string(),
//   glass_sunroof: joi.string(),
//   tail_lamps: joi.string(),
//   third_brake_light: joi.string(),
//   rear_wipers: joi.string(),
//   defogger: joi.string(),
//   power_boot_lid_opening: joi.string(),
//   side_foot_step: joi.string(),
//   rear_diffuser: joi.string(),
//   rear_spoiler: joi.string(),
//   exhaust_tips: joi.string(),
//   convertible_roof: joi.string(),
//   easy_access_boot_opener: joi.string(),
//   digital_display_key: joi.string(),
//   sports_assisted_key_band: joi.string(),
// });

// const interiorEquipmentSchema = joi.object({
//   gear_knob: joi.string(),
//   side_sill_moulding: joi.string(),
//   keyless_start_stop: joi.string(),
//   climate_control_system: joi.string(),
//   heater: joi.string(),
//   vanity_mirror: joi.string(),
//   cabin_lamps: joi.string(),
//   analog_clock: joi.string(),
//   front_armrest: joi.string(),
//   cupholders: joi.string(),
//   cool_glove_box: joi.string(),
//   rear_armrest: joi.string(),
//   rear_refrigerator: joi.string(),
//   smokers_package: joi.string(),
//   in_car_wifi: joi.string(),
//   ambient_lighting: joi.string(),
//   wireless_charging: joi.string(),
//   power_socket: joi.string(),
//   usb_aux: joi.string(),
//   auto_dimming_irvm: joi.string(),
//   auto_dimming_orvm: joi.string(),
//   power_windows: joi.string(),
//   rear_windows_blind: joi.string(),
//   rear_windshield_blind: joi.string(),
//   boot_lid_opener: joi.string(),
//   child_safety_lock: joi.string(),
//   steering_wheel: joi.string(),
//   steering_wheels_equipment: joi.string(),
//   heated_steering_wheel: joi.string(),
//   steering_wheel_adjustment: joi.string(),
//   paddle_shifters: joi.string(),
//   heads_up_display: joi.string(),
//   electric_handbrake: joi.string(),
//   instrument_cluster: joi.string(),
//   speedometer: joi.string(),
//   tachometer: joi.string(),
//   fuel_gauge: joi.string(),
//   engine_tem_gauge: joi.string(),
//   mid: joi.string(),
//   digital_speed: joi.string(),
//   gear_position_indicator: joi.string(),
//   gear_shifting_indicator: joi.string(),
//   electric_handbrake: joi.string(),
//   instrument_cluster: joi.string(),
//   trip_meter: joi.string(),
//   average_speed: joi.string(),
//   average_fuel_consumption: joi.string(),
//   realtime_fuel_consumption: joi.string(),
//   fuel_range: joi.string(),
//   low_fuel_warning: joi.string(),
//   door_ajar_warning: joi.string(),
//   glass_roof: joi.string(),
//   emergency_spare_wheel: joi.string(),
// });

// const suspensionBrakesWheelsTyresSchema = joi.object({
//   front_suspension: joi.string(),
//   rear_suspension: joi.string(),
//   front_brakes: joi.string(),
//   rear_brakes: joi.string(),
//   exhaust_system_type: joi.string(),
//   front_wheels_tyres: joi.string(),
// });

// const dimensionsWeightStorageCapacitySchema = joi.object({
//   length: joi.number(),
//   width: joi.number(),
//   height: joi.number(),
//   wheelbase: joi.number(),
//   front_track: joi.number(),
//   rear_track: joi.number(),
//   ground_clearance: joi.string(),
//   doors: joi.string(),
//   seating_capacity: joi.string(),
//   rows: joi.string(),
//   kerb_weight: joi.number(),
//   bootspace: joi.number(),
//   fuel_capacity: joi.number(),
// });

// const entertainmentRearSchema = joi.object({
//   screens: joi.number(),
//   input_ports: joi.string(),
//   other_equipments: joi.string(),
// });

// const seatsUpholsterySchema = joi.object({
//   front_seats: joi.string(),
//   comfort_driver_seat: joi.string(),
//   comfort_co_driver_seat: joi.string(),
//   electric_lumbar_support_driver_seat: joi.string(),
//   electric_lumbar_support_co_driver_seat: joi.string(),
//   powered_height_adjustment_driver_seat: joi.string(),
//   powered_height_adjustment_co_driver_seat: joi.string(),
//   powered_underthigh_extension_driver_seat: joi.string(),
//   powered_underthigh_extension_co_driver_seat: joi.string(),
//   powered_headrest_driver_seat: joi.string(),
//   powered_headrest_co_driver_seat: joi.string(),
//   ventilated_front_seats: joi.string(),
//   heated_front_seats: joi.string(),
//   front_seat_massage: joi.string(),
//   rear_seats: joi.string(),
//   comfort_seats: joi.string(),
//   electric_lumbar_support: joi.string(),
//   powered_side_bolsters: joi.string(),
//   powered_underthigh_extension: joi.string(),
//   powered_headrest: joi.string(),
//   ventilated_seats: joi.string(),
//   heated_seats: joi.string(),
//   seat_massage: joi.string(),
//   executive_lounge_seating: joi.string(),
//   gentlemen_function: joi.string(),
//   interior_upholstery: joi.string(),
//   headliner: joi.string(),
//   seat_belt: joi.string(),
//   second_row: joi.string(),
//   third_row: joi.string(),
// });

// const safetyEquipmentsSchema = joi.object({
//   airbags: joi.number(),
//   abs: joi.string(),
//   ebd: joi.string(),
//   ba: joi.string(),
//   esp: joi.string(),
//   tc: joi.string(),
//   tmpts: joi.string(),
//   hill_hold_assist: joi.string(),
//   blind_spot_assist: joi.string(),
//   lane_keep_assist: joi.string(),
//   seat_belt_warning: joi.string(),
//   cruise_control: joi.string(),
//   limited_slip_differential: joi.string(),
//   parking_sensors: joi.string(),
//   reverse_camera: joi.string(),
//   _360_aerial_view_panoramic_view: joi.string(),
//   parking_assistance: joi.string(),
//   remote_parking: joi.string(),
//   remote_central_locking: joi.string(),
//   regenerative_braking: joi.string(),
//   seat_belt_pretensioners: joi.string(),
//   night_vision: joi.string(),
//   cornering_brake_control: joi.string(),
//   electric_parking_brake: joi.string(),
//   vehicle_immobiliser: joi.string(),
//   isofix_child_seat_mounting: joi.string(),
//   speed_sensing_door_locks: joi.string(),
//   emergency_rear_brake_light: joi.string(),
//   chassis_construction: joi.string(),
//   body_construction: joi.string(),
//   dual_popup_roll_bars_in_convertibles: joi.string(),
//   popup_hood_during_frontal_collision: joi.string(),
//   other_safety_equipments: joi.string(),
// });

// const entertainmentFrontSchema = joi.object({
//   hd_colour_display: joi.string(),
//   in_built_hard_drive: joi.string(),
//   cd_dvd_player: joi.string(),
//   am_fm_radio: joi.string(),
//   bluetooth_connectivity: joi.string(),
//   music_system_power_output: joi.string(),
//   no_of_speakers: joi.number(),
//   apple_carplay: joi.string(),
//   android_auto: joi.string(),
//   gps_navigation: joi.string(),
//   in_built_convenience_apps: joi.string(),
//   enhanced_voice_control: joi.string(),
//   gesture_control: joi.string(),
//   touchpad_rotary_controller: joi.string(),
//   other_equipments: joi.string(),
// });

// const warrantyServicePackageSchema = joi.object({
//   warranty: joi.string(),
//   service_package_with_details: joi.string(),
// });

// const exteriorColoursSchema = joi.object({
//   exterior_colours: joi.string(),
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
//     user_id: joi.string(),
//   }),
// };

// Interior Image Schema
const interiorImageSchema = joi.object({
  actual_name: joi.string(),
  internal_name: joi.string(),
});

// Car Image Schema
const carImageSchema = joi.object({
  exterior_image: joi.array().items(interiorImageSchema),
  interior_image: joi.array().items(interiorImageSchema),
});

// Car Summary Schema
const carSummarySchema = joi.object({
  car_image: carImageSchema,
  car_name: joi.string(),
  price: joi.string(),
  reg_year: joi.string(),
  fuel_type: joi.string(),
  kms: joi.string(),
  reg_state: joi.string(),
});

// Overview Schema
const overviewSchema = joi.object({
  vin: joi.string(),
  make: joi.string(),
  model: joi.string(),
  exterior_colour: joi.string(),
  engine: joi.string(),
  transmission: joi.string(),
  ownership: joi.string(),
  peak_torque: joi.string(),
  peak_power: joi.string(),
  doors: joi.string(),
  drive: joi.string(),
  seating_capacity: joi.string(),
  manufacturing_year: joi.string(),
});

// Engine and Transmission Schema
const engineAndTransmissionSchema = joi.object({
  engine_displacement: joi.string(),
  power_figure: joi.string(),
  torque_figure: joi.string(),
  drivetrain: joi.string(),
  transmission: joi.string(),
});

// Hybrid System Schema
const hybridSystemSchema = joi.object({
  e_motor_type_size: joi.string(),
  power_figure: joi.string(),
  torque_figure: joi.string(),
  combined_power_torque: joi.string(),
});

// Performance Efficiency Schema
const performanceEfficiencySchema = joi.object({
  eco_start_stop_system: joi.string(),
  driving_modes: joi.string(),
  terrain_response_mode: joi.string(),
  active_aerodynamics: joi.string(),
  exhaust_system_type: joi.string(),
  rear_axle_steering: joi.string(),
  acceleration: joi.string(),
  top_speed: joi.string(),
  fuel_type: joi.string(),
  fuel_consumption: joi.string(),
  emission_std: joi.string(),
});

// Exterior Equipment Schema
const exteriorEquipmentSchema = joi.object({
  head_lamps: joi.string(),
  head_lamp_washer: joi.string(),
  drls: joi.string(),
  fog_lamps: joi.string(),
  cornering_lamps: joi.string(),
  follow_me_home_lamps: joi.string(),
  rain_sensing_wipers: joi.string(),
  orvm_electrically_adjustable_retractable: joi.string(),
  puddle_lamps: joi.string(),
  heat_protecting_glazing_windows: joi.string(),
  frameless_doors: joi.string(),
  soft_close_doors: joi.string(),
  central_locking: joi.string(),
  integrated_roof_rails: joi.string(),
  glass_sunroof: joi.string(),
  tail_lamps: joi.string(),
  third_brake_light: joi.string(),
  rear_wipers: joi.string(),
  defogger: joi.string(),
  power_boot_lid_opening: joi.string(),
  side_foot_step: joi.string(),
  rear_diffuser: joi.string(),
  rear_spoiler: joi.string(),
  exhaust_tips: joi.string(),
  convertible_roof: joi.string(),
  easy_access_boot_opener: joi.string(),
  digital_display_key: joi.string(),
  sports_assisted_key_band: joi.string(),
});

// Interior Equipment Schema
const interiorEquipmentSchema = joi.object({
  gear_knob: joi.string(),
  side_sill_moulding: joi.string(),
  keyless_start_stop: joi.string(),
  climate_control_system: joi.string(),
  heater: joi.string(),
  vanity_mirror: joi.string(),
  cabin_lamps: joi.string(),
  analog_clock: joi.string(),
  front_armrest: joi.string(),
  cupholders: joi.string(),
  cool_glove_box: joi.string(),
  rear_armrest: joi.string(),
  rear_refrigerator: joi.string(),
  smokers_package: joi.string(),
  incar_wifi: joi.string(),
  ambient_lighting: joi.string(),
  wireless_charging: joi.string(),
  power_socket: joi.string(),
  usb_aux: joi.string(),
  auto_dimming_irvm: joi.string(),
  auto_dimming_orvm: joi.string(),
  power_windows: joi.string(),
  rear_windows_blind: joi.string(),
  rear_windshield_blind: joi.string(),
  boot_lid_opener: joi.string(),
  child_safety_lock: joi.string(),
  steering_wheel: joi.string(),
  steering_wheels_equipment: joi.string(),
  steering_wheel_adjustment: joi.string(),
  paddle_shifters: joi.string(),
  heads_up_display: joi.string(),
  electric_handbrake: joi.string(),
  instrument_cluster: joi.string(),
  speedometer: joi.string(),
  tachometer: joi.string(),
  fuel_gauge: joi.string(),
  engine_temp_gauge: joi.string(),
  mid: joi.string(),
  digital_speed: joi.string(),
  gear_position_indicator: joi.string(),
  gear_shifting_indicator: joi.string(),
  trip_meter: joi.string(),
  average_speed: joi.string(),
  average_fuel_consumption: joi.string(),
  realtime_fuel_consumption: joi.string(),
  fuel_range: joi.string(),
  low_fuel_warning: joi.string(),
  door_ajar_warning: joi.string(),
  glass_roof: joi.string(),
  emergency_spare_wheel: joi.string(),
});

// Suspension Brakes Wheels Tyres Schema
const suspensionBrakesWheelsTyresSchema = joi.object({
  front_suspension: joi.string(),
  rear_suspension: joi.string(),
  front_brakes: joi.string(),
  rear_brakes: joi.string(),
  exhaust_system_type: joi.string(),
  front_wheels_tyres: joi.string(),
});

// Dimensions Weight Storage Capacity Schema
const dimensionsWeightStorageCapacitySchema = joi.object({
  length: joi.string(),
  width: joi.string(),
  height: joi.string(),
  wheelbase: joi.string(),
  front_track: joi.string(),
  rear_track: joi.string(),
  ground_clearance: joi.string(),
  doors: joi.string(),
  seating_capacity: joi.string(),
  rows: joi.string(),
  kerb_weight: joi.string(),
  bootspace: joi.string(),
  fuel_capacity: joi.string(),
});

// Entertainment Rear Schema
const entertainmentRearSchema = joi.object({
  screens: joi.string(),
  input_ports: joi.string(),
  other_equipments: joi.string(),
});

// Seats Upholstery Schema
const seatsUpholsterySchema = joi.object({
  front_seats: joi.string(),
  comfort_driver_seat: joi.string(),
  comfort_co_driver_seat: joi.string(),
  electric_lumbar_support_driver_seat: joi.string(),
  electric_lumbar_support_co_driver_seat: joi.string(),
  powered_height_adjustment_driver_seat: joi.string(),
  powered_height_adjustment_co_driver_seat: joi.string(),
  powered_underthigh_extension_driver_seat: joi.string(),
  powered_underthigh_extension_co_driver_seat: joi.string(),
  powered_headrest_driver_seat: joi.string(),
  powered_headrest_co_driver_seat: joi.string(),
  ventilated_front_seats: joi.string(),
  heated_front_seats: joi.string(),
  front_seat_massage: joi.string(),
  rear_seats: joi.string(),
  comfort_seats: joi.string(),
  electric_lumbar_support: joi.string(),
  powered_side_bolsters: joi.string(),
  powered_underthigh_extension: joi.string(),
  powered_headrest: joi.string(),
  ventilated_seats: joi.string(),
  heated_seats: joi.string(),
  seat_massage: joi.string(),
  executive_lounge_seating: joi.string(),
  gentlemen_function: joi.string(),
  interior_upholstery: joi.string(),
  headliner: joi.string(),
  seat_belt: joi.string(),
  second_row: joi.string(),
  third_row: joi.string(),
});

// Safety Equipments Schema
const safetyEquipmentsSchema = joi.object({
  airbags: joi.string(),
  abs: joi.string(),
  ebd: joi.string(),
  ba: joi.string(),
  esp: joi.string(),
  tc: joi.string(),
  tmpts: joi.string(),
  hill_hold_assist: joi.string(),
  blind_spot_assist: joi.string(),
  lane_keep_assist: joi.string(),
  seat_belt_warning: joi.string(),
  cruise_control: joi.string(),
  limited_slip_differential: joi.string(),
  parking_sensors: joi.string(),
  reverse_camera: joi.string(),
  _360_aerial_view_panoramic_view: joi.string(),
  parking_assistance: joi.string(),
  remote_parking: joi.string(),
  remote_central_locking: joi.string(),
  regenerative_braking: joi.string(),
  seat_belt_pretensioners: joi.string(),
  night_vision: joi.string(),
  cornering_brake_control: joi.string(),
  electric_parking_brake: joi.string(),
  vehicle_immobiliser: joi.string(),
  isofix_child_seat_mounting: joi.string(),
  speed_sensing_door_locks: joi.string(),
  emergency_rear_brake_light: joi.string(),
  chassis_construction: joi.string(),
  body_construction: joi.string(),
  dual_popup_roll_bars_in_convertibles: joi.string(),
  popup_hood_during_frontal_collision: joi.string(),
  other_safety_equipments: joi.string(),
});

// Entertainment Front Schema
const entertainmentFrontSchema = joi.object({
  hd_colour_display: joi.string(),
  in_built_hard_drive: joi.string(),
  cd_dvd_player: joi.string(),
  am_fm_radio: joi.string(),
  bluetooth_connectivity: joi.string(),
  music_system_power_output: joi.string(),
  no_of_speakers: joi.string(),
  apple_carplay: joi.string(),
  android_auto: joi.string(),
  gps_navigation: joi.string(),
  in_built_convenience_apps: joi.string(),
  enhanced_voice_control: joi.string(),
  gesture_control: joi.string(),
  touchpad_rotary_controller: joi.string(),
  other_equipments: joi.string(),
});

// Warranty Service Package Schema
const warrantyServicePackageSchema = joi.object({
  warranty: joi.string(),
  service_package_with_details: joi.string(),
});

// Exterior Colours Schema
const exteriorColoursSchema = joi.object({
  exterior_colours: joi.string(),
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
    user_id: joi.string(),
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
    user_id: joi.string(),
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
