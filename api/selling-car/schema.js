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
//         actual_name: joi.any().allow(null, "").optional(),
//         internal_name: joi.any().allow(null, "").optional(),
//       })
//     ),
//     interior_image: joi.array().items(
//       joi.object({
//         actual_name: joi.any().allow(null, "").optional(),
//         internal_name: joi.any().allow(null, "").optional(),
//       })
//     ),
//   }),
//   car_name: joi.any().allow(null, "").optional(),
//   price: joi.number(),
//   reg_year: joi.number(),
//   fuel_type: joi.any().allow(null, "").optional(),
//   kms: joi.number(),
//   reg_state: joi.any().allow(null, "").optional(),
// });

// const overviewSchema = joi.object({
//   vin: joi.any().allow(null, "").optional(),
//   make: joi.any().allow(null, "").optional(),
//   model: joi.any().allow(null, "").optional(),
//   exterior_colour: joi.any().allow(null, "").optional(),
//   engine: joi.any().allow(null, "").optional(),
//   transmission: joi.any().allow(null, "").optional(),
//   ownership: joi.any().allow(null, "").optional(),
//   peak_torque: joi.any().allow(null, "").optional(),
//   peak_power: joi.any().allow(null, "").optional(),
//   doors: joi.number(),
//   drive: joi.number(),
//   seating_capacity: joi.number(),
//   manufacturing_year: joi.number(),
// });

// const engineAndTransmissionSchema = joi.object({
//   engine_displacement: joi.any().allow(null, "").optional(),
//   power_figure: joi.any().allow(null, "").optional(),
//   torque_figure: joi.any().allow(null, "").optional(),
//   drivetrain: joi.any().allow(null, "").optional(),
//   transmission: joi.any().allow(null, "").optional(),
// });

// const hybridSystemSchema = joi.object({
//   e_motor_type_size: joi.any().allow(null, "").optional(),
//   power_figure: joi.any().allow(null, "").optional(),
//   torque_figure: joi.any().allow(null, "").optional(),
//   combined_power_torque: joi.any().allow(null, "").optional(),
// });

// const performanceEfficiencySchema = joi.object({
//   eco_start_stop_system: joi.any().allow(null, "").optional(),
//   driving_modes: joi.any().allow(null, "").optional(),
//   terrain_response_mode: joi.any().allow(null, "").optional(),
//   active_aerodynamics: joi.any().allow(null, "").optional(),
//   exhaust_system_type: joi.any().allow(null, "").optional(),
//   rear_axle_steering: joi.any().allow(null, "").optional(),
//   acceleration: joi.any().allow(null, "").optional(),
//   top_speed: joi.number(),
//   fuel_type: joi.any().allow(null, "").optional(),
//   fuel_consumption: joi.number(),
//   emission_std: joi.any().allow(null, "").optional(),
// });

// const exteriorEquipmentSchema = joi.object({
//   head_lamps: joi.any().allow(null, "").optional(),
//   head_lamp_washer: joi.any().allow(null, "").optional(),
//   drls: joi.any().allow(null, "").optional(),
//   fog_lamps: joi.any().allow(null, "").optional(),
//   cornering_lamps: joi.any().allow(null, "").optional(),
//   follow_me_home_lamps: joi.any().allow(null, "").optional(),
//   rain_sensing_wipers: joi.any().allow(null, "").optional(),
//   orvm_electrically_adjustable_retractable: joi.any().allow(null, "").optional(),
//   puddle_lamps: joi.any().allow(null, "").optional(),
//   heat_protecting_glazing_windows: joi.any().allow(null, "").optional(),
//   frameless_doors: joi.any().allow(null, "").optional(),
//   soft_close_doors: joi.any().allow(null, "").optional(),
//   central_locking: joi.any().allow(null, "").optional(),
//   integrated_roof_rails: joi.any().allow(null, "").optional(),
//   glass_sunroof: joi.any().allow(null, "").optional(),
//   tail_lamps: joi.any().allow(null, "").optional(),
//   third_brake_light: joi.any().allow(null, "").optional(),
//   rear_wipers: joi.any().allow(null, "").optional(),
//   defogger: joi.any().allow(null, "").optional(),
//   power_boot_lid_opening: joi.any().allow(null, "").optional(),
//   side_foot_step: joi.any().allow(null, "").optional(),
//   rear_diffuser: joi.any().allow(null, "").optional(),
//   rear_spoiler: joi.any().allow(null, "").optional(),
//   exhaust_tips: joi.any().allow(null, "").optional(),
//   convertible_roof: joi.any().allow(null, "").optional(),
//   easy_access_boot_opener: joi.any().allow(null, "").optional(),
//   digital_display_key: joi.any().allow(null, "").optional(),
//   sports_assisted_key_band: joi.any().allow(null, "").optional(),
// });

// const interiorEquipmentSchema = joi.object({
//   gear_knob: joi.any().allow(null, "").optional(),
//   side_sill_moulding: joi.any().allow(null, "").optional(),
//   keyless_start_stop: joi.any().allow(null, "").optional(),
//   climate_control_system: joi.any().allow(null, "").optional(),
//   heater: joi.any().allow(null, "").optional(),
//   vanity_mirror: joi.any().allow(null, "").optional(),
//   cabin_lamps: joi.any().allow(null, "").optional(),
//   analog_clock: joi.any().allow(null, "").optional(),
//   front_armrest: joi.any().allow(null, "").optional(),
//   cupholders: joi.any().allow(null, "").optional(),
//   cool_glove_box: joi.any().allow(null, "").optional(),
//   rear_armrest: joi.any().allow(null, "").optional(),
//   rear_refrigerator: joi.any().allow(null, "").optional(),
//   smokers_package: joi.any().allow(null, "").optional(),
//   in_car_wifi: joi.any().allow(null, "").optional(),
//   ambient_lighting: joi.any().allow(null, "").optional(),
//   wireless_charging: joi.any().allow(null, "").optional(),
//   power_socket: joi.any().allow(null, "").optional(),
//   usb_aux: joi.any().allow(null, "").optional(),
//   auto_dimming_irvm: joi.any().allow(null, "").optional(),
//   auto_dimming_orvm: joi.any().allow(null, "").optional(),
//   power_windows: joi.any().allow(null, "").optional(),
//   rear_windows_blind: joi.any().allow(null, "").optional(),
//   rear_windshield_blind: joi.any().allow(null, "").optional(),
//   boot_lid_opener: joi.any().allow(null, "").optional(),
//   child_safety_lock: joi.any().allow(null, "").optional(),
//   steering_wheel: joi.any().allow(null, "").optional(),
//   steering_wheels_equipment: joi.any().allow(null, "").optional(),
//   heated_steering_wheel: joi.any().allow(null, "").optional(),
//   steering_wheel_adjustment: joi.any().allow(null, "").optional(),
//   paddle_shifters: joi.any().allow(null, "").optional(),
//   heads_up_display: joi.any().allow(null, "").optional(),
//   electric_handbrake: joi.any().allow(null, "").optional(),
//   instrument_cluster: joi.any().allow(null, "").optional(),
//   speedometer: joi.any().allow(null, "").optional(),
//   tachometer: joi.any().allow(null, "").optional(),
//   fuel_gauge: joi.any().allow(null, "").optional(),
//   engine_tem_gauge: joi.any().allow(null, "").optional(),
//   mid: joi.any().allow(null, "").optional(),
//   digital_speed: joi.any().allow(null, "").optional(),
//   gear_position_indicator: joi.any().allow(null, "").optional(),
//   gear_shifting_indicator: joi.any().allow(null, "").optional(),
//   electric_handbrake: joi.any().allow(null, "").optional(),
//   instrument_cluster: joi.any().allow(null, "").optional(),
//   trip_meter: joi.any().allow(null, "").optional(),
//   average_speed: joi.any().allow(null, "").optional(),
//   average_fuel_consumption: joi.any().allow(null, "").optional(),
//   realtime_fuel_consumption: joi.any().allow(null, "").optional(),
//   fuel_range: joi.any().allow(null, "").optional(),
//   low_fuel_warning: joi.any().allow(null, "").optional(),
//   door_ajar_warning: joi.any().allow(null, "").optional(),
//   glass_roof: joi.any().allow(null, "").optional(),
//   emergency_spare_wheel: joi.any().allow(null, "").optional(),
// });

// const suspensionBrakesWheelsTyresSchema = joi.object({
//   front_suspension: joi.any().allow(null, "").optional(),
//   rear_suspension: joi.any().allow(null, "").optional(),
//   front_brakes: joi.any().allow(null, "").optional(),
//   rear_brakes: joi.any().allow(null, "").optional(),
//   exhaust_system_type: joi.any().allow(null, "").optional(),
//   front_wheels_tyres: joi.any().allow(null, "").optional(),
// });

// const dimensionsWeightStorageCapacitySchema = joi.object({
//   length: joi.number(),
//   width: joi.number(),
//   height: joi.number(),
//   wheelbase: joi.number(),
//   front_track: joi.number(),
//   rear_track: joi.number(),
//   ground_clearance: joi.any().allow(null, "").optional(),
//   doors: joi.any().allow(null, "").optional(),
//   seating_capacity: joi.any().allow(null, "").optional(),
//   rows: joi.any().allow(null, "").optional(),
//   kerb_weight: joi.number(),
//   bootspace: joi.number(),
//   fuel_capacity: joi.number(),
// });

// const entertainmentRearSchema = joi.object({
//   screens: joi.number(),
//   input_ports: joi.any().allow(null, "").optional(),
//   other_equipments: joi.any().allow(null, "").optional(),
// });

// const seatsUpholsterySchema = joi.object({
//   front_seats: joi.any().allow(null, "").optional(),
//   comfort_driver_seat: joi.any().allow(null, "").optional(),
//   comfort_co_driver_seat: joi.any().allow(null, "").optional(),
//   electric_lumbar_support_driver_seat: joi.any().allow(null, "").optional(),
//   electric_lumbar_support_co_driver_seat: joi.any().allow(null, "").optional(),
//   powered_height_adjustment_driver_seat: joi.any().allow(null, "").optional(),
//   powered_height_adjustment_co_driver_seat: joi.any().allow(null, "").optional(),
//   powered_underthigh_extension_driver_seat: joi.any().allow(null, "").optional(),
//   powered_underthigh_extension_co_driver_seat: joi.any().allow(null, "").optional(),
//   powered_headrest_driver_seat: joi.any().allow(null, "").optional(),
//   powered_headrest_co_driver_seat: joi.any().allow(null, "").optional(),
//   ventilated_front_seats: joi.any().allow(null, "").optional(),
//   heated_front_seats: joi.any().allow(null, "").optional(),
//   front_seat_massage: joi.any().allow(null, "").optional(),
//   rear_seats: joi.any().allow(null, "").optional(),
//   comfort_seats: joi.any().allow(null, "").optional(),
//   electric_lumbar_support: joi.any().allow(null, "").optional(),
//   powered_side_bolsters: joi.any().allow(null, "").optional(),
//   powered_underthigh_extension: joi.any().allow(null, "").optional(),
//   powered_headrest: joi.any().allow(null, "").optional(),
//   ventilated_seats: joi.any().allow(null, "").optional(),
//   heated_seats: joi.any().allow(null, "").optional(),
//   seat_massage: joi.any().allow(null, "").optional(),
//   executive_lounge_seating: joi.any().allow(null, "").optional(),
//   gentlemen_function: joi.any().allow(null, "").optional(),
//   interior_upholstery: joi.any().allow(null, "").optional(),
//   headliner: joi.any().allow(null, "").optional(),
//   seat_belt: joi.any().allow(null, "").optional(),
//   second_row: joi.any().allow(null, "").optional(),
//   third_row: joi.any().allow(null, "").optional(),
// });

// const safetyEquipmentsSchema = joi.object({
//   airbags: joi.number(),
//   abs: joi.any().allow(null, "").optional(),
//   ebd: joi.any().allow(null, "").optional(),
//   ba: joi.any().allow(null, "").optional(),
//   esp: joi.any().allow(null, "").optional(),
//   tc: joi.any().allow(null, "").optional(),
//   tmpts: joi.any().allow(null, "").optional(),
//   hill_hold_assist: joi.any().allow(null, "").optional(),
//   blind_spot_assist: joi.any().allow(null, "").optional(),
//   lane_keep_assist: joi.any().allow(null, "").optional(),
//   seat_belt_warning: joi.any().allow(null, "").optional(),
//   cruise_control: joi.any().allow(null, "").optional(),
//   limited_slip_differential: joi.any().allow(null, "").optional(),
//   parking_sensors: joi.any().allow(null, "").optional(),
//   reverse_camera: joi.any().allow(null, "").optional(),
//   _360_aerial_view_panoramic_view: joi.any().allow(null, "").optional(),
//   parking_assistance: joi.any().allow(null, "").optional(),
//   remote_parking: joi.any().allow(null, "").optional(),
//   remote_central_locking: joi.any().allow(null, "").optional(),
//   regenerative_braking: joi.any().allow(null, "").optional(),
//   seat_belt_pretensioners: joi.any().allow(null, "").optional(),
//   night_vision: joi.any().allow(null, "").optional(),
//   cornering_brake_control: joi.any().allow(null, "").optional(),
//   electric_parking_brake: joi.any().allow(null, "").optional(),
//   vehicle_immobiliser: joi.any().allow(null, "").optional(),
//   isofix_child_seat_mounting: joi.any().allow(null, "").optional(),
//   speed_sensing_door_locks: joi.any().allow(null, "").optional(),
//   emergency_rear_brake_light: joi.any().allow(null, "").optional(),
//   chassis_construction: joi.any().allow(null, "").optional(),
//   body_construction: joi.any().allow(null, "").optional(),
//   dual_popup_roll_bars_in_convertibles: joi.any().allow(null, "").optional(),
//   popup_hood_during_frontal_collision: joi.any().allow(null, "").optional(),
//   other_safety_equipments: joi.any().allow(null, "").optional(),
// });

// const entertainmentFrontSchema = joi.object({
//   hd_colour_display: joi.any().allow(null, "").optional(),
//   in_built_hard_drive: joi.any().allow(null, "").optional(),
//   cd_dvd_player: joi.any().allow(null, "").optional(),
//   am_fm_radio: joi.any().allow(null, "").optional(),
//   bluetooth_connectivity: joi.any().allow(null, "").optional(),
//   music_system_power_output: joi.any().allow(null, "").optional(),
//   no_of_speakers: joi.number(),
//   apple_carplay: joi.any().allow(null, "").optional(),
//   android_auto: joi.any().allow(null, "").optional(),
//   gps_navigation: joi.any().allow(null, "").optional(),
//   in_built_convenience_apps: joi.any().allow(null, "").optional(),
//   enhanced_voice_control: joi.any().allow(null, "").optional(),
//   gesture_control: joi.any().allow(null, "").optional(),
//   touchpad_rotary_controller: joi.any().allow(null, "").optional(),
//   other_equipments: joi.any().allow(null, "").optional(),
// });

// const warrantyServicePackageSchema = joi.object({
//   warranty: joi.any().allow(null, "").optional(),
//   service_package_with_details: joi.any().allow(null, "").optional(),
// });

// const exteriorColoursSchema = joi.object({
//   exterior_colours: joi.any().allow(null, "").optional(),
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
//     user_id: joi.any().allow(null, "").optional(),
//   }),
// };

// Interior Image Schema
const interiorImageSchema = joi.object({
  actual_name: joi.any().allow(null, "").optional(),
  internal_name: joi.any().allow(null, "").optional(),
});

// Car Image Schema
const carImageSchema = joi.object({
  exterior_image: joi.array().items(interiorImageSchema),
  interior_image: joi.array().items(interiorImageSchema),
});

// Car Summary Schema
const carSummarySchema = joi.object({
  car_image: carImageSchema,
  car_name: joi.any().allow(null, "").optional(),
  price: joi.any().allow(null, "").optional(),
  reg_year: joi.any().allow(null, "").optional(),
  fuel_type: joi.any().allow(null, "").optional(),
  kms: joi.any().allow(null, "").optional(),
  reg_state: joi.any().allow(null, "").optional(),
});

// Overview Schema
const overviewSchema = joi.object({
  vin: joi.any().allow(null, "").optional(),
  make: joi.any().allow(null, "").optional(),
  model: joi.any().allow(null, "").optional(),
  exterior_colour: joi.any().allow(null, "").optional(),
  engine: joi.any().allow(null, "").optional(),
  transmission: joi.any().allow(null, "").optional(),
  ownership: joi.any().allow(null, "").optional(),
  peak_torque: joi.any().allow(null, "").optional(),
  peak_power: joi.any().allow(null, "").optional(),
  doors: joi.any().allow(null, "").optional(),
  drive: joi.any().allow(null, "").optional(),
  seating_capacity: joi.any().allow(null, "").optional(),
  manufacturing_year: joi.any().allow(null, "").optional(),
});

// Engine and Transmission Schema
const engineAndTransmissionSchema = joi.object({
  engine_displacement: joi.any().allow(null, "").optional(),
  power_figure: joi.any().allow(null, "").optional(),
  torque_figure: joi.any().allow(null, "").optional(),
  drivetrain: joi.any().allow(null, "").optional(),
  transmission: joi.any().allow(null, "").optional(),
});

// Hybrid System Schema
const hybridSystemSchema = joi.object({
  e_motor_type_size: joi.any().allow(null, "").optional(),
  power_figure: joi.any().allow(null, "").optional(),
  torque_figure: joi.any().allow(null, "").optional(),
  combined_power_torque: joi.any().allow(null, "").optional(),
});

// Performance Efficiency Schema
const performanceEfficiencySchema = joi.object({
  eco_start_stop_system: joi.any().allow(null, "").optional(),
  driving_modes: joi.any().allow(null, "").optional(),
  terrain_response_mode: joi.any().allow(null, "").optional(),
  active_aerodynamics: joi.any().allow(null, "").optional(),
  exhaust_system_type: joi.any().allow(null, "").optional(),
  rear_axle_steering: joi.any().allow(null, "").optional(),
  acceleration: joi.any().allow(null, "").optional(),
  top_speed: joi.any().allow(null, "").optional(),
  fuel_type: joi.any().allow(null, "").optional(),
  fuel_consumption: joi.any().allow(null, "").optional(),
  emission_std: joi.any().allow(null, "").optional(),
});

// Exterior Equipment Schema
const exteriorEquipmentSchema = joi.object({
  head_lamps: joi.any().allow(null, "").optional(),
  head_lamp_washer: joi.any().allow(null, "").optional(),
  drls: joi.any().allow(null, "").optional(),
  fog_lamps: joi.any().allow(null, "").optional(),
  cornering_lamps: joi.any().allow(null, "").optional(),
  follow_me_home_lamps: joi.any().allow(null, "").optional(),
  rain_sensing_wipers: joi.any().allow(null, "").optional(),
  orvm_electrically_adjustable_retractable: joi.any().allow(null, "").optional(),
  puddle_lamps: joi.any().allow(null, "").optional(),
  heat_protecting_glazing_windows: joi.any().allow(null, "").optional(),
  frameless_doors: joi.any().allow(null, "").optional(),
  soft_close_doors: joi.any().allow(null, "").optional(),
  central_locking: joi.any().allow(null, "").optional(),
  integrated_roof_rails: joi.any().allow(null, "").optional(),
  glass_sunroof: joi.any().allow(null, "").optional(),
  tail_lamps: joi.any().allow(null, "").optional(),
  third_brake_light: joi.any().allow(null, "").optional(),
  rear_wipers: joi.any().allow(null, "").optional(),
  defogger: joi.any().allow(null, "").optional(),
  power_boot_lid_opening: joi.any().allow(null, "").optional(),
  side_foot_step: joi.any().allow(null, "").optional(),
  rear_diffuser: joi.any().allow(null, "").optional(),
  rear_spoiler: joi.any().allow(null, "").optional(),
  exhaust_tips: joi.any().allow(null, "").optional(),
  convertible_roof: joi.any().allow(null, "").optional(),
  easy_access_boot_opener: joi.any().allow(null, "").optional(),
  digital_display_key: joi.any().allow(null, "").optional(),
  sports_assisted_key_band: joi.any().allow(null, "").optional(),
});

// Interior Equipment Schema
const interiorEquipmentSchema = joi.object({
  gear_knob: joi.any().allow(null, "").optional(),
  side_sill_moulding: joi.any().allow(null, "").optional(),
  keyless_start_stop: joi.any().allow(null, "").optional(),
  climate_control_system: joi.any().allow(null, "").optional(),
  heater: joi.any().allow(null, "").optional(),
  vanity_mirror: joi.any().allow(null, "").optional(),
  cabin_lamps: joi.any().allow(null, "").optional(),
  analog_clock: joi.any().allow(null, "").optional(),
  front_armrest: joi.any().allow(null, "").optional(),
  cupholders: joi.any().allow(null, "").optional(),
  cool_glove_box: joi.any().allow(null, "").optional(),
  rear_armrest: joi.any().allow(null, "").optional(),
  rear_refrigerator: joi.any().allow(null, "").optional(),
  smokers_package: joi.any().allow(null, "").optional(),
  incar_wifi: joi.any().allow(null, "").optional(),
  ambient_lighting: joi.any().allow(null, "").optional(),
  wireless_charging: joi.any().allow(null, "").optional(),
  power_socket: joi.any().allow(null, "").optional(),
  usb_aux: joi.any().allow(null, "").optional(),
  auto_dimming_irvm: joi.any().allow(null, "").optional(),
  auto_dimming_orvm: joi.any().allow(null, "").optional(),
  power_windows: joi.any().allow(null, "").optional(),
  rear_windows_blind: joi.any().allow(null, "").optional(),
  rear_windshield_blind: joi.any().allow(null, "").optional(),
  boot_lid_opener: joi.any().allow(null, "").optional(),
  child_safety_lock: joi.any().allow(null, "").optional(),
  steering_wheel: joi.any().allow(null, "").optional(),
  steering_wheels_equipment: joi.any().allow(null, "").optional(),
  steering_wheel_adjustment: joi.any().allow(null, "").optional(),
  paddle_shifters: joi.any().allow(null, "").optional(),
  heads_up_display: joi.any().allow(null, "").optional(),
  electric_handbrake: joi.any().allow(null, "").optional(),
  instrument_cluster: joi.any().allow(null, "").optional(),
  speedometer: joi.any().allow(null, "").optional(),
  tachometer: joi.any().allow(null, "").optional(),
  fuel_gauge: joi.any().allow(null, "").optional(),
  engine_temp_gauge: joi.any().allow(null, "").optional(),
  mid: joi.any().allow(null, "").optional(),
  digital_speed: joi.any().allow(null, "").optional(),
  gear_position_indicator: joi.any().allow(null, "").optional(),
  gear_shifting_indicator: joi.any().allow(null, "").optional(),
  trip_meter: joi.any().allow(null, "").optional(),
  average_speed: joi.any().allow(null, "").optional(),
  average_fuel_consumption: joi.any().allow(null, "").optional(),
  realtime_fuel_consumption: joi.any().allow(null, "").optional(),
  fuel_range: joi.any().allow(null, "").optional(),
  low_fuel_warning: joi.any().allow(null, "").optional(),
  door_ajar_warning: joi.any().allow(null, "").optional(),
  glass_roof: joi.any().allow(null, "").optional(),
  emergency_spare_wheel: joi.any().allow(null, "").optional(),
});

// Suspension Brakes Wheels Tyres Schema
const suspensionBrakesWheelsTyresSchema = joi.object({
  front_suspension: joi.any().allow(null, "").optional(),
  rear_suspension: joi.any().allow(null, "").optional(),
  front_brakes: joi.any().allow(null, "").optional(),
  rear_brakes: joi.any().allow(null, "").optional(),
  exhaust_system_type: joi.any().allow(null, "").optional(),
  front_wheels_tyres: joi.any().allow(null, "").optional(),
});

// Dimensions Weight Storage Capacity Schema
const dimensionsWeightStorageCapacitySchema = joi.object({
  length: joi.any().allow(null, "").optional(),
  width: joi.any().allow(null, "").optional(),
  height: joi.any().allow(null, "").optional(),
  wheelbase: joi.any().allow(null, "").optional(),
  front_track: joi.any().allow(null, "").optional(),
  rear_track: joi.any().allow(null, "").optional(),
  ground_clearance: joi.any().allow(null, "").optional(),
  doors: joi.any().allow(null, "").optional(),
  seating_capacity: joi.any().allow(null, "").optional(),
  rows: joi.any().allow(null, "").optional(),
  kerb_weight: joi.any().allow(null, "").optional(),
  bootspace: joi.any().allow(null, "").optional(),
  fuel_capacity: joi.any().allow(null, "").optional(),
});

// Entertainment Rear Schema
const entertainmentRearSchema = joi.object({
  screens: joi.any().allow(null, "").optional(),
  input_ports: joi.any().allow(null, "").optional(),
  other_equipments: joi.any().allow(null, "").optional(),
});

// Seats Upholstery Schema
const seatsUpholsterySchema = joi.object({
  front_seats: joi.any().allow(null, "").optional(),
  comfort_driver_seat: joi.any().allow(null, "").optional(),
  comfort_co_driver_seat: joi.any().allow(null, "").optional(),
  electric_lumbar_support_driver_seat: joi.any().allow(null, "").optional(),
  electric_lumbar_support_co_driver_seat: joi.any().allow(null, "").optional(),
  powered_height_adjustment_driver_seat: joi.any().allow(null, "").optional(),
  powered_height_adjustment_co_driver_seat: joi.any().allow(null, "").optional(),
  powered_underthigh_extension_driver_seat: joi.any().allow(null, "").optional(),
  powered_underthigh_extension_co_driver_seat: joi.any().allow(null, "").optional(),
  powered_headrest_driver_seat: joi.any().allow(null, "").optional(),
  powered_headrest_co_driver_seat: joi.any().allow(null, "").optional(),
  ventilated_front_seats: joi.any().allow(null, "").optional(),
  heated_front_seats: joi.any().allow(null, "").optional(),
  front_seat_massage: joi.any().allow(null, "").optional(),
  rear_seats: joi.any().allow(null, "").optional(),
  comfort_seats: joi.any().allow(null, "").optional(),
  electric_lumbar_support: joi.any().allow(null, "").optional(),
  powered_side_bolsters: joi.any().allow(null, "").optional(),
  powered_underthigh_extension: joi.any().allow(null, "").optional(),
  powered_headrest: joi.any().allow(null, "").optional(),
  ventilated_seats: joi.any().allow(null, "").optional(),
  heated_seats: joi.any().allow(null, "").optional(),
  seat_massage: joi.any().allow(null, "").optional(),
  executive_lounge_seating: joi.any().allow(null, "").optional(),
  gentlemen_function: joi.any().allow(null, "").optional(),
  interior_upholstery: joi.any().allow(null, "").optional(),
  headliner: joi.any().allow(null, "").optional(),
  seat_belt: joi.any().allow(null, "").optional(),
  second_row: joi.any().allow(null, "").optional(),
  third_row: joi.any().allow(null, "").optional(),
});

// Safety Equipments Schema
const safetyEquipmentsSchema = joi.object({
  airbags: joi.any().allow(null, "").optional(),
  abs: joi.any().allow(null, "").optional(),
  ebd: joi.any().allow(null, "").optional(),
  ba: joi.any().allow(null, "").optional(),
  esp: joi.any().allow(null, "").optional(),
  tc: joi.any().allow(null, "").optional(),
  tmpts: joi.any().allow(null, "").optional(),
  hill_hold_assist: joi.any().allow(null, "").optional(),
  blind_spot_assist: joi.any().allow(null, "").optional(),
  lane_keep_assist: joi.any().allow(null, "").optional(),
  seat_belt_warning: joi.any().allow(null, "").optional(),
  cruise_control: joi.any().allow(null, "").optional(),
  limited_slip_differential: joi.any().allow(null, "").optional(),
  parking_sensors: joi.any().allow(null, "").optional(),
  reverse_camera: joi.any().allow(null, "").optional(),
  _360_aerial_view_panoramic_view: joi.any().allow(null, "").optional(),
  parking_assistance: joi.any().allow(null, "").optional(),
  remote_parking: joi.any().allow(null, "").optional(),
  remote_central_locking: joi.any().allow(null, "").optional(),
  regenerative_braking: joi.any().allow(null, "").optional(),
  seat_belt_pretensioners: joi.any().allow(null, "").optional(),
  night_vision: joi.any().allow(null, "").optional(),
  cornering_brake_control: joi.any().allow(null, "").optional(),
  electric_parking_brake: joi.any().allow(null, "").optional(),
  vehicle_immobiliser: joi.any().allow(null, "").optional(),
  isofix_child_seat_mounting: joi.any().allow(null, "").optional(),
  speed_sensing_door_locks: joi.any().allow(null, "").optional(),
  emergency_rear_brake_light: joi.any().allow(null, "").optional(),
  chassis_construction: joi.any().allow(null, "").optional(),
  body_construction: joi.any().allow(null, "").optional(),
  dual_popup_roll_bars_in_convertibles: joi.any().allow(null, "").optional(),
  popup_hood_during_frontal_collision: joi.any().allow(null, "").optional(),
  other_safety_equipments: joi.any().allow(null, "").optional(),
});

// Entertainment Front Schema
const entertainmentFrontSchema = joi.object({
  hd_colour_display: joi.any().allow(null, "").optional(),
  in_built_hard_drive: joi.any().allow(null, "").optional(),
  cd_dvd_player: joi.any().allow(null, "").optional(),
  am_fm_radio: joi.any().allow(null, "").optional(),
  bluetooth_connectivity: joi.any().allow(null, "").optional(),
  music_system_power_output: joi.any().allow(null, "").optional(),
  no_of_speakers: joi.any().allow(null, "").optional(),
  apple_carplay: joi.any().allow(null, "").optional(),
  android_auto: joi.any().allow(null, "").optional(),
  gps_navigation: joi.any().allow(null, "").optional(),
  in_built_convenience_apps: joi.any().allow(null, "").optional(),
  enhanced_voice_control: joi.any().allow(null, "").optional(),
  gesture_control: joi.any().allow(null, "").optional(),
  touchpad_rotary_controller: joi.any().allow(null, "").optional(),
  other_equipments: joi.any().allow(null, "").optional(),
});

// Warranty Service Package Schema
const warrantyServicePackageSchema = joi.object({
  warranty: joi.any().allow(null, "").optional(),
  service_package_with_details: joi.any().allow(null, "").optional(),
});

// Exterior Colours Schema
const exteriorColoursSchema = joi.object({
  exterior_colours: joi.any().allow(null, "").optional(),
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
    user_id: joi.any().allow(null, "").optional(),
  }),
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.any().allow(null, "").optional(),
    status: joi.any().allow(null, "").optional(),
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
    user_id: joi.any().allow(null, "").optional(),
  }),
  params: {
    car_id: joi.any().allow(null, "").optional(),
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
