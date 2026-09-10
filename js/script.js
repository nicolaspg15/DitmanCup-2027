// ======= CONFIGURACIÓN DEL TORNEO / TOURNAMENT CONFIG =======
// Única fuente de los números del torneo. Cambiá acá cuando se cierren.
// Single source of truth for the tournament numbers. Edit here once final.
const TOURNAMENT_CONFIG = {
  totalRunners: 32,
  numGroups: 8,
  groupSize: 4,
  qualifiersPerGroup: 2,   // clasificados por grupo a la llave / advance per group

  // Apertura de las clasificatorias ("qualys"). Formato ISO con offset.
  // Qualifier window opens. ISO format with UTC offset.
  qualysOpen: '2026-11-20T00:00:00-03:00',      // 20 nov 2026, 00:00 hora Argentina (UTC-3)
  qualysTimeZone: 'America/Argentina/Buenos_Aires', // solo para mostrar la fecha siempre igual

  // Modo prueba: usa datos falsos en Grupos / Clasificatorias / Brackets.
  // También se activa agregando ?mock=1 a la URL (sin tocar el código).
  // Test mode: fake data. Also enabled with ?mock=1 in the URL.
  mock: false,
};

// ======= FUENTES DE DATOS (Google Sheets) / DATA SOURCES =======
// Pegar acá el link de "Publicar en la web -> CSV" de cada hoja.
// Sheet PRINCIPAL del torneo (2027). Por ahora está casi vacía: hasta que se
// carguen corredores, la pestaña Clasificatorias muestra el mensaje de vacío.
const SHEET_ID = '1oBfViFUu-jujuuVkXmNCU4Ew9Lt9gCEptcTYFwPtZHw';
const sheetCsv = gid => `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

const SHEET_URLS = {
  groups: '',                      // gid de la hoja de grupos — pendiente
  standings: sheetCsv('1240403995'), // hoja "Qualifiers" de la sheet principal
};

// ======= BANDERAS / FLAGS =======
// País de cada corredor. Se usa cuando la Sheet no trae la columna "Flag".
// Valor: código ISO de 2 letras ("AR", "UY", "US", "JP"...) o directamente un emoji.
// Clave: nombre del corredor en minúsculas. / Key: runner name, lowercased.
const RUNNER_FLAGS = {
  jokeruy: 'UY',
  // sawken: 'AR',
  // luis_sera: 'UY',
  // ...completar. También se puede llenar la columna "Flag" de la Sheet.
};

// ======= EDICIONES ANTERIORES / PAST EDITIONS =======
// Podio de cada Ditman Cup pasada. Dejar '' lo que falte.
const PAST_EDITIONS = [
  {
    year: 2026,
    champion: 'JokerUY',
    runnerUp: 'Sawken',
    third: 'Pochoide',
    vod: 'https://www.youtube.com/@DitmanCup',
  },
  {
    year: 2022,
    champion: '',
    runnerUp: '',
    third: '',
    vod: '',
  },
];

// ======= MEJORES CLIPS / BEST CLIPS =======
// Clips destacados por sección. Extraídos del canal de Twitch (twitch.tv/ditmancup).
// Cada item: s = slug del clip, t = título, a = autor del clip, v = views, d = fecha.
// Para sumar uno a mano: agregá { s: '<slug>', ... } a la sección que quieras.
const CLIPS = [
  { section: 'Ditman Cup 2026', items: [
    { s: 'NeighborlyAdorableOctopusOSsloth-naioivubgNMq57TY', t: 'Tenes que cerrar el estadio, los genios hacen eso', a: 'Gallardd', v: 120, d: '2026-01-20' },
    { s: 'OutstandingTenaciousSoymilkTTours-wRFOfwbbdffulO6q', t: 'SAWKEN TODODROGADO', a: 'MateoUsh27', v: 107, d: '2026-01-25' },
    { s: 'FlirtySucculentMosquitoOMGScoots-EFR8hfxGtCFAy7hL', t: 'CHACO KICK', a: 'JokerUY', v: 98, d: '2026-01-13' },
    { s: 'DistinctPlumpLegDeIlluminati-DJgd6W_mll5N1CZc', t: 'MISSING MOST CREEPYPASTA GALLERY', a: 'JokerUY', v: 92, d: '2026-02-21' },
    { s: 'BlueAdorableToadChefFrank-la6UlXjFJNLEYywW', t: 'EL FOLLOW MATEO EL FOLLOOOOOOOW', a: 'sawkenn', v: 85, d: '2026-02-07' },
    { s: 'FurryPerfectFerretEleGiggle-SPnRwG9pHQB9lzkH', t: 'That is so UNLUCKY', a: 'MikeWavRR', v: 70, d: '2026-02-12' },
    { s: 'CloudyStormyApePMSTwin-9eeZAF9w9R-M54cL', t: 'youcri activa los cheats de invencibilidad', a: 'sawkenn', v: 64, d: '2026-02-08' },
    { s: 'BusyAliveTigerLitty-wJwAOmsjsjrpAlLD', t: 'el wachin ta de paso nomas', a: 'sawkenn', v: 63, d: '2026-01-28' },
    { s: 'TentativeAcceptableIcecreamArsonNoSexy-aoOYQ1bm-isR9ATd', t: 'creepypasta novis2 para pocho', a: 'sawkenn', v: 63, d: '2026-02-02' },
    { s: 'KathishRelentlessBoarPastaThat-OIg3PEFsWsxFU9gT', t: 'INSTA MUFA JOKER', a: 'JokerUY', v: 61, d: '2026-02-07' },
    { s: 'GrotesqueObeseEagleAliens-TA3OH4wFkEnuG5tx', t: 'OUT OF BOUND FLASH ARCA', a: 'JokerUY', v: 59, d: '2026-02-09' },
    { s: 'CrypticHilariousConsoleKappaPride-Z8vcsSWRyxGaoYhV', t: 'pocho no lo hago mas', a: 'gapi0909', v: 58, d: '2026-01-25' },
    { s: 'ThankfulIncredulousSproutThisIsSparta-Fp-Heo8xDXKA55NG', t: 'la jokermufa', a: 'sawkenn', v: 54, d: '2026-01-31' },
    { s: 'ShyCrunchyBottleCeilingCat-RKwaxjtJFr5jM45w', t: 'que andas mostrando arca', a: 'sawkenn', v: 52, d: '2026-02-16' },
    { s: 'ScaryAthleticQuailNotLikeThis-yD2oLEMv8PSTtqP-', t: 'o7 granada', a: 'JokerUY', v: 49, d: '2026-02-12' },
    { s: 'ThoughtfulAmorphousRamenCmonBruh-09HRgzGtbaQcCRBQ', t: 'MATEO CHUPAME LA P', a: '4rcadan', v: 48, d: '2026-01-18' },
    { s: 'CredulousDeafFerretKevinTurtle-2nvPAOkzJY4tjWiD', t: 'pocho memed in canyon twice', a: 'playking615', v: 47, d: '2026-02-12' },
    { s: 'VivaciousSavageSalmonThisIsSparta-ywwpq8QVTzWS6Qx2', t: 'missing recontra mega duro mirando la puerta', a: 'pochiel_', v: 39, d: '2026-02-18' },
    { s: 'ResilientYawningBoarGingerPower-bIFpAa3LTviEOzUx', t: 'infa out of novis3 Sane', a: 'sawkenn', v: 39, d: '2026-01-31' },
    { s: 'PowerfulDirtyPangolinEagleEye-sd68cy399prIlOhB', t: 'novi creepypasta lo persigue', a: 'sawkenn', v: 38, d: '2026-01-31' },
    { s: 'SpoopyLuckyReindeerAsianGlow-W7Rohlzf5zyJSkly', t: 'NOOOOOOOOOOOOOOO', a: 'JokerUY', v: 36, d: '2026-02-07' },
    { s: 'PlacidStrongMoonCurseLit-rTEUwI29wn6Ax-r6', t: 'SAWKEN PORFAVOR!!!!', a: 'sawkenn', v: 36, d: '2026-02-21' },
    { s: 'WittyExuberantChoughSquadGoals-LiddZ1Qv2Xtsap0Y', t: 'insane mirror', a: 'sawkenn', v: 36, d: '2026-02-21' },
    { s: 'CrispyRefinedLegWTRuck-C1ScalxfOrla4u3p', t: 'disparos re merca', a: 'sawkenn', v: 34, d: '2026-02-14' },
    { s: 'DepressedElatedOctopusDatSheffy-gMCDVgvE1NBV06D_', t: 'combea2 war extremo', a: 'sawkenn', v: 32, d: '2026-02-20' },
    { s: 'DifferentToughIguanaOpieOP-k2dB0JeR1N1hlNrs', t: 'tirale el rocket al novi ya fue', a: 'sawkenn', v: 32, d: '2026-01-31' },
    { s: 'EnthusiasticDignifiedRamenHassanChop-Bve_YvNm3tOlwfu6', t: 'joker creepypasta clutch whall part 2', a: 'JokerUY', v: 30, d: '2026-02-19' },
    { s: 'EasyFunnyBoarCclamChamp-EJfiDsAnUuyteOOv', t: '1 bala', a: 'JokerUY', v: 30, d: '2026-02-12' },
    { s: 'PopularLachrymoseLocustPeoplesChamp-B51ef87AmfYPXkW6', t: 'pocho merca', a: 'JokerUY', v: 30, d: '2026-02-15' },
    { s: 'TemperedEmpathicKangarooTebowing-sx_-OInI2-UxCDeL', t: 'Novis 2 Sane sure', a: 'JokerUY', v: 30, d: '2026-02-11' },
    { s: 'VivaciousSlipperyPoxMoreCowbell-loP5MqjD_erQXu5i', t: 'rare rng', a: 'slifercs', v: 29, d: '2026-02-19' },
    { s: 'SplendidVainWatermelonThisIsSparta--Wh32YzZtqJPDcSV', t: 'He never got a bad merchant', a: 'sawkenn', v: 28, d: '2026-02-11' },
    { s: 'DeadSpikyFriesRalpherZ-tkxlKQEkOG3GHflX', t: 'debería estar bien', a: 'MateoUsh27', v: 27, d: '2026-02-08' },
    { s: 'PeppyBadAardvarkGingerPower-EhpdYRLvBd0I-4Ju', t: 'cabin cup hechomierda', a: 'sawkenn', v: 25, d: '2026-02-12' },
    { s: 'HandsomeAverageAirGuitarThunBeast-qAocU8y_0nBValTF', t: 'novis2 creepypasta youcri (arca died before also VODIJ)', a: 'JokerUY', v: 25, d: '2026-02-09' },
    { s: 'MuddyCrowdedCrabsBuddhaBar-m35zP1Dhb42ej0_h', t: 'novis1 mega ultra combo', a: 'sawkenn', v: 24, d: '2026-02-21' },
    { s: 'IntelligentSpoopyPancakeDendiFace-7yslr-G2RleRes9t', t: 'UNA ROCAAAAAAAAA AGHHHHHHHH', a: 'JokerUY', v: 23, d: '2026-02-09' },
    { s: 'BlitheKathishRadishTwitchRaid-1tQQ9WOaH72Lgduf', t: 'si esta ada se muere ada, si esta sherry se meure, (MUERE)', a: 'JokerUY', v: 21, d: '2026-02-12' },
    { s: 'MoistLaconicHummingbirdKeepo-BmrfOoBTGCyQPZnH', t: 'EL CURRENT PACE DE OTAKU CAMBIO!!', a: 'JokerUY', v: 21, d: '2026-02-15' },
    { s: 'RenownedSuaveShallotCurseLit-juUvgsVaaFMKDOsQ', t: 'LORE DE POCHO PARALISIS DE SUEÑO', a: 'JokerUY', v: 21, d: '2026-02-15' },
    { s: 'GorgeousPlacidApeSaltBae-kdFt6g-qskqVpTu2', t: 'pocho ojos amarillo fluor', a: 'sawkenn', v: 20, d: '2026-02-15' },
    { s: 'AlertRudeReubenNotATK-CQJ2lCHpi_O6VDmE', t: 'pocho avion', a: 'MateoUsh27', v: 20, d: '2026-01-25' },
    { s: 'TenuousTriangularGullPupper-QWDa_Ul8ViYxg0vB', t: 'POCHO WARHALL 2', a: 'JokerUY', v: 20, d: '2026-02-12' },
    { s: 'MildLitigiousGrassKappaWealth-DTO8E4-uF-hbKJ5D', t: 'POCHO WARHALL 1', a: 'JokerUY', v: 19, d: '2026-02-12' },
    { s: 'TrustworthyResourcefulNarwhalWow-pAGb5rAkSMD7jN_K', t: 'aint locked in the target xdd', a: 'roger_eduardo67', v: 19, d: '2026-01-15' },
    { s: 'BovineDarkSaladRedCoat-amoJaF-sbxXAhFYw', t: 'matrix', a: 'sawkenn', v: 19, d: '2026-02-24' },
    { s: 'AntsyHealthyAardvarkMrDestructoid-XRO8QMWM0R49U9Ai', t: 'controles invertido', a: 'gapi0909', v: 19, d: '2026-01-28' },
    { s: 'CrazyMildHamBloodTrail-2AIBDr2aRq0Vzhu3', t: 'SAWKEN ANGEL DE LA GUARDA', a: 'JokerUY', v: 19, d: '2026-02-12' },
    { s: 'PeppyUninterestedBorkHoneyBadger-Dgo5nELYJ4vilPIM', t: 'joker creepypasta clutch whall part 1', a: 'JokerUY', v: 18, d: '2026-02-19' },
    { s: 'LivelyKawaiiAyeayeFUNgineer-6jHWBj-ihJW-TFvq', t: 'creepypasta dog', a: 'sawkenn', v: 18, d: '2026-02-21' },
    { s: 'ColdInnocentTroutTBTacoLeft-FganDOLboJXqmZBS', t: 'IMPOSSIBLE TO MUFA MISSING', a: 'JokerUY', v: 18, d: '2026-02-16' },
    { s: 'MoldyFastCheddarFUNgineer-lmRNR8lbJYdXiB8k', t: 'hechomierda frit missing novis2', a: 'JokerUY', v: 17, d: '2026-02-09' },
    { s: 'SuaveCorrectBurritoDuDudu-qf0IMbFM_tpZGvVe', t: 'CREEPYPASTA JAPONES LA SUCIA ESA', a: 'JokerUY', v: 17, d: '2026-02-09' },
    { s: 'AbstrusePoorTurnipNotATK-0KzUd_hoxHKyGGAN', t: 'missing recontra mega duro mirando la caja', a: 'Missing', v: 17, d: '2026-02-19' },
    { s: 'BetterCrunchyToothHeyGirl-4tkr5UuVcHxY_8-f', t: 'INSTA MUFA', a: 'JokerUY', v: 16, d: '2026-02-08' },
    { s: 'LitigiousPricklySalmonKappaClaus-yG99lMK1UAVZ5Cll', t: 'lo recontra rusheaba wtf', a: 'sawkenn', v: 16, d: '2026-02-21' },
    { s: 'BloodyGlutenFreeMosquitoSoBayed-f3ZmnlkrLZhy0giS', t: 'joker mufa x3000', a: 'JokerUY', v: 15, d: '2026-01-31' },
    { s: 'TiredShinyFoxSoBayed-nxJfkTKgd96KLv5b', t: 'CREEPYPASTA CABINS', a: 'JokerUY', v: 14, d: '2026-02-09' },
    { s: 'SparklingRelentlessCucumberDoggo-nb2utcMzgCIPBo1X', t: 'mateo mufa', a: 'JokerUY', v: 13, d: '2026-02-07' },
  ] },
  { section: '2022 Tournament', items: [
    { s: 'TenuousFancyYakinikuLitFam-en79hrjrsVnDO973', t: 'u3 warp?', a: 'eidenfir', v: 362, d: '2022-03-20' },
    { s: 'CogentEnjoyableReubenMVGame-lt1c4ETva9t3cJqp', t: 'Mom IRL RNG', a: 'eidenfir', v: 215, d: '2022-03-05' },
    { s: 'GrossSpotlessJellyfishDxAbomb-YprCYwmP7EPAwfCJ', t: 'biggest combo in history', a: 'sawkenn', v: 199, d: '2022-02-23' },
    { s: 'VastPunchySardineBudBlast-YI4sNgwyrbgqNPF_', t: 'Garrador new knife strat?', a: 'JoeKoh27', v: 158, d: '2022-02-06' },
    { s: 'AmericanModernStingrayMrDestructoid-GWohRGQ8hkLO2SGd', t: 'Thanks novi Okayge', a: 'Spartanfinix117', v: 141, d: '2022-02-17' },
    { s: 'GloriousKawaiiSheepDerp-wQpDdUHUCyiu7gfp', t: 'novi chilling on the ceiling', a: 'sawkenn', v: 119, d: '2022-02-20' },
    { s: 'ColdbloodedTransparentBadgerPeanutButterJellyTime-RybWBSRV9pp14iYf', t: 'dogey bodyblock', a: 'DrumsetWereWolf', v: 111, d: '2022-03-10' },
    { s: 'ColorfulTentativeVanillaBigBrother-G8IS59v03huTOt2e', t: 'WHAT ARE YOU DOING???!!', a: 'sawkenn', v: 102, d: '2022-04-24' },
    { s: 'NastyBrightLegSquadGoals-Z0Yb0hymdVqTYyBb', t: 'HELLO??', a: 'sawkenn', v: 96, d: '2022-02-12' },
    { s: 'StrangeFlaccidPizzaNomNom-ai04Gx2dEzgJjZgi', t: 'Oh no he is dead', a: 'Kevin700P', v: 94, d: '2022-02-27' },
    { s: 'TardyArtsyNoodleCorgiDerp-j7woBDewzicUClOg', t: 'calculated', a: 'enhikee', v: 91, d: '2022-06-08' },
    { s: 'GloriousRealOysterAMPEnergyCherry-8Wm1oUOlD_Y6uzeE', t: 'ashley??????', a: 'sawkenn', v: 89, d: '2022-03-27' },
    { s: 'AlertProudDragonKappa-F3ykbPtcMEKJ2-ZI', t: 'SYNCED', a: 'sawkenn', v: 85, d: '2022-02-18' },
    { s: 'BlushingSlickWasabiStinkyCheese-_Uxh_rpiHoD8Q0Yx', t: 'little flex', a: 'sawkenn', v: 82, d: '2022-02-05' },
    { s: 'TrappedResourcefulClipsmomFutureMan-gDRiI-_7EMneYDpn', t: 'RE4 NG Pro Steam 60fps !tournament !prizepool | Qualifying !bracket, round 1, Kromer vs Hikee, Tuesday 8th, 10pm UTC+1', a: 'sawkenn', v: 70, d: '2022-02-08' },
    { s: 'FreezingTangibleSandstormAMPEnergy-4z1UsWBIdDJ4WCFm', t: 'WHAT THE!!!', a: 'sawkenn', v: 67, d: '2022-04-24' },
    { s: 'NastyHardWrenchKippa-3R8g__fVInBON2vC', t: 'HOW?!', a: 'eidenfir', v: 63, d: '2022-02-12' },
    { s: 'EmpathicDarlingTermitePastaThat-FiUDeTPknLRfrnO5', t: 'Invert Aim new strat?', a: 'JoeKoh27', v: 62, d: '2022-02-05' },
    { s: 'SincereSuccessfulDeerShazBotstix-ZwN7ci_wIHzvdGGf', t: 'THAT BAD?!!!', a: 'eidenfir', v: 52, d: '2022-03-10' },
    { s: 'SquareBoredSrirachaVoHiYo-Vqco2PF4UFgunLnH', t: 'Cursed by Sniper\'s Commentary', a: 'ImSniperKiller', v: 46, d: '2022-02-06' },
    { s: 'CreativeDifficultAlbatrossKappa-03IffEVsxfk3Mgdb', t: 'Luis prediction', a: 'DrumsetWereWolf', v: 46, d: '2022-02-24' },
    { s: 'SneakyMildChowderWholeWheat-mTLmvpk4MbJqSYWn', t: 'YEAAAAAA', a: 'eidenfir', v: 45, d: '2022-02-19' },
    { s: 'FrigidEnergeticMeatloafKeyboardCat-kZ0oa2bcOEBC3U3a', t: 'miracle in the wrecking ball', a: 'Tania__ainaT', v: 44, d: '2022-03-12' },
    { s: 'IgnorantSlipperyPieCoolStoryBob-4M2DauyXfbRQ459V', t: 'cursed loading', a: 'sawkenn', v: 43, d: '2022-03-20' },
    { s: 'ShortSpikyBoarAsianGlow-a81NryKaLximPnte', t: 'Nooo luis te pasaste KEKW', a: 'l_tobirama', v: 42, d: '2022-02-07' },
    { s: 'TolerantIronicSoymilkDogFace-9jwqm4C_22gPO6bc', t: 'RE4 NG Pro Steam 60fps !tournament !prizepool | Qualifying !bracket, round 2, OtakuXD vs Hikee, Sunday 27th, 10 pm UTC+1', a: 'RedWiwen', v: 37, d: '2022-02-27' },
    { s: 'CuriousTastyNewtRitzMitz-bFQNixUcP1bMu8Zr', t: '25.52', a: 'sawkenn', v: 34, d: '2022-07-02' },
    { s: 'MuddyGenerousLettuceOSfrog-2uhT_Q6-AKSwMSp1', t: 'Near perfect sync', a: 'casualspeedrun', v: 32, d: '2022-02-18' },
    { s: 'StormyCooperativeWatercressPeanutButterJellyTime-SUm5o6W7-wQNkqs_', t: 'jetski glitch', a: 'enhikee', v: 27, d: '2023-12-18' },
    { s: 'ObservantPoisedRuffBudStar-9Yqp5BZqnK4X4ZeP', t: 'u3 safe', a: 'shunviewer', v: 26, d: '2022-04-30' },
    { s: 'ModernDeliciousTurtleNerfRedBlaster-28Jwo97QZ0mmnZal', t: 'MajorWeirdChamp', a: 'DrumsetWereWolf', v: 25, d: '2022-02-13' },
    { s: 'VastVastTortoiseM4xHeh-8I4bxqCLx_N-hbWO', t: 'Lost Ark > RE4', a: 'ImSniperKiller', v: 19, d: '2022-02-19' },
    { s: 'DifferentDarlingWaspTBCheesePull-KmrlpeD5pLX_L1ou', t: 'tankei nada', a: 'SiaoMuleki', v: 17, d: '2022-02-12' },
    { s: 'BillowingSincereMagpieFloof-7iUQ26mrQ_OE68ke', t: 'inventory i-frames', a: 'ImSniperKiller', v: 17, d: '2022-02-18' },
    { s: 'KindCredulousGullBCWarrior-XUU9KSU4oxyZDYfW', t: '36k', a: 'eidenfir', v: 17, d: '2022-03-13' },
    { s: 'FrigidAgileBibimbapSmoocherZ-tDYgoSR3GMJAIeYW', t: 'tavo don comedy KEKO', a: 'l_tobirama', v: 17, d: '2022-03-03' },
    { s: 'AliveGlutenFreeAppleShadyLulu-Q-XSDIemYTzA9Otu', t: 'RE4 NG Pro Steam 60fps !tournament | Qualifying !brackets, round 1, Chrioden vs ImSniperkiller, Saturday 5th, 10pm UTC+1', a: 'RockCandyy', v: 14, d: '2022-02-05' },
    { s: 'LovelyScrumptiousSeahorseCmonBruh-JYNhKb7RzttDiSIK', t: '.', a: 'sawkenn', v: 14, d: '2023-11-28' },
    { s: 'DeafPlacidDiamondSmoocherZ-hMgv_A7y3AD28ZHQ', t: 'Sadge', a: 'enhikee', v: 14, d: '2022-04-02' },
  ] },
];

// ======= RUNNERS DE RE4 EN VIVO / RE4 RUNNERS LIVE =======
// Canales de Twitch a vigilar. Se marca "EN VIVO" consultando decapi.me (sin API key).
// Completar/limpiar esta lista con los handles reales de los runners.
const RE4_LIVE_CHANNELS = [
  'DitmanCup', 'sawkenn', 'jokeruy', '4rcadan', 'nevs_', 'slifercs', 'casualspeedrun',
];

// ======= TEXTOS BILINGÜES / BILINGUAL STRINGS =======
const I18N = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.sorteo': 'Sorteo',
    'nav.grupos': 'Grupos',
    'nav.brackets': 'Brackets',
    'nav.clasificatorias': 'Clasificatorias',
    'nav.champions': 'Campeones',
    'nav.clips': 'Clips',
    'nav.live': 'En vivo',
    'nav.donaciones': 'Donaciones',
    'nav.organizadores': 'Organizadores',
    'nav.menu': 'Abrir menú',

    'hero.subtitle': 'Torneo comunitario de speedrunning de Resident Evil 4 — formato copa del mundo.',

    'countdown.label': 'Faltan para que abran las qualys',
    'countdown.days': 'días',
    'countdown.hours': 'horas',
    'countdown.mins': 'min',
    'countdown.secs': 'seg',
    'countdown.open': '¡Las qualys ya están abiertas!',
    'countdown.datePrefix': 'Apertura:',

    'facts.runners': 'corredores',
    'facts.groups': 'grupos',
    'facts.qualify': 'clasifican x grupo',

    'intro.p': 'Bienvenidos a la Ditman Cup 2027. Acá vas a encontrar el sorteo, los grupos, el cuadro de eliminación y todo lo necesario para seguir el torneo de punta a punta.',

    'sorteo.title': 'Sorteo',
    'sorteo.vod': 'VOD del sorteo — próximamente',
    'sorteo.note': 'Los resultados del sorteo se reflejan automáticamente en la pestaña Grupos.',

    'grupos.title': 'Fase de grupos',
    'grupos.loading': 'Cargando grupos…',
    'grupos.sheetError': 'No se pudo cargar la Sheet. Mostrando datos de ejemplo.',
    'group.word': 'Grupo',
    'group.tbd': 'Por definir',

    'brackets.title': 'Brackets',
    'brackets.placeholder': 'El cuadro de eliminación se arma una vez cerrada la fase de grupos.',
    'brackets.previewNote': 'Vista previa del cuadro — {n} clasificados. Los cruces reales se definen al cerrar la fase de grupos.',
    'bracket.champion': 'Campeón/a',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinal',
    'bracket.round.quarter': 'Cuartos',
    'bracket.round.r16': 'Octavos',
    'bracket.round.r32': '16avos',
    'bracket.round.generic': 'Ronda de {n}',

    'clas.title': 'Clasificatorias y placements',
    'clas.empty': 'Todavía no hay clasificación cargada.',
    'clas.sheetError': 'No se pudo cargar la Sheet de clasificación.',
    'clas.noData': 'Sin datos todavía.',
    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Corredor',
    'clas.col.group': 'Grupo',
    'clas.col.time': 'Mejor tiempo',
    'clas.col.pts': 'Pts',

    'don.title': 'Donaciones',
    'don.body': 'La Ditman Cup se sostiene gracias a la comunidad. Si querés colaborar con los premios y los gastos del torneo, podés hacerlo acá:',
    'don.btn': 'Donar',

    'org.title': 'Organización y staff',
    'org.tier.organizers': 'Organizadores',
    'org.tier.mods': 'Moderadores',
    'org.tier.helpers': 'Helpers y casters',
    'org.tier.design': 'Arte y diseño',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderador',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.artDesign': 'Arte y diseño',

    'link.discord': 'Discord',
    'link.rules': 'Reglas',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Campeones',
    'champions.edition': 'Ditman Cup {year}',
    'champions.champion': 'Campeón',
    'champions.runnerUp': 'Subcampeón',
    'champions.third': '3er puesto',
    'champions.tbd': 'Por confirmar',
    'champions.vod': 'Ver final',
    'champions.trophyTitle': 'El trofeo',
    'champions.trophyPending': 'El trofeo de la Ditman Cup 2027 todavía se está diseñando.',

    'clips.title': 'Mejores clips',
    'clips.intro': 'Momentos destacados de ediciones y torneos anteriores.',
    'clips.empty': 'Todavía no hay clips cargados. ¿Tenés uno? Pasálo por Discord.',

    'live.title': 'Runners de RE4 en vivo',
    'live.intro': 'Canales de la comunidad que están corriendo Resident Evil 4 ahora mismo.',
    'live.on': 'EN VIVO',
    'live.off': 'Desconectado',
    'live.none': 'Ningún canal de la lista está en vivo en este momento.',
    'live.watch': 'Ver en Twitch',
    'live.checking': 'Chequeando canales…',

    'footer.text': 'Ditman Cup 2027 · Hecho por la comunidad',

    'testmode': 'MODO PRUEBA · datos falsos',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.sorteo': 'Draw',
    'nav.grupos': 'Groups',
    'nav.brackets': 'Bracket',
    'nav.clasificatorias': 'Standings',
    'nav.champions': 'Champions',
    'nav.clips': 'Clips',
    'nav.live': 'Live',
    'nav.donaciones': 'Donations',
    'nav.organizadores': 'Organizers',
    'nav.menu': 'Open menu',

    'hero.subtitle': 'Community Resident Evil 4 speedrunning tournament — World Cup format.',

    'countdown.label': 'Until the qualifiers open',
    'countdown.days': 'days',
    'countdown.hours': 'hours',
    'countdown.mins': 'min',
    'countdown.secs': 'sec',
    'countdown.open': 'Qualifiers are now open!',
    'countdown.datePrefix': 'Opens:',

    'facts.runners': 'runners',
    'facts.groups': 'groups',
    'facts.qualify': 'advance per group',

    'intro.p': "Welcome to the Ditman Cup 2027. Here you'll find the draw, the groups, the knockout bracket and everything you need to follow the tournament end to end.",

    'sorteo.title': 'Draw',
    'sorteo.vod': 'Draw VOD — coming soon',
    'sorteo.note': 'Draw results are reflected automatically in the Groups tab.',

    'grupos.title': 'Group stage',
    'grupos.loading': 'Loading groups…',
    'grupos.sheetError': 'Could not load the Sheet. Showing sample data.',
    'group.word': 'Group',
    'group.tbd': 'TBD',

    'brackets.title': 'Bracket',
    'brackets.placeholder': 'The knockout bracket goes live once the group stage is finalized.',
    'brackets.previewNote': 'Bracket preview — {n} qualifiers. Real matchups are set once the group stage is finalized.',
    'bracket.champion': 'Champion',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinals',
    'bracket.round.quarter': 'Quarterfinals',
    'bracket.round.r16': 'Round of 16',
    'bracket.round.r32': 'Round of 32',
    'bracket.round.generic': 'Round of {n}',

    'clas.title': 'Standings & placements',
    'clas.empty': 'No standings loaded yet.',
    'clas.sheetError': 'Could not load the standings Sheet.',
    'clas.noData': 'No data yet.',
    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Runner',
    'clas.col.group': 'Group',
    'clas.col.time': 'Best time',
    'clas.col.pts': 'Pts',

    'don.title': 'Donations',
    'don.body': 'The Ditman Cup runs on community support. If you want to chip in for the prize pool and tournament costs, you can do it here:',
    'don.btn': 'Donate',

    'org.title': 'Organizers & staff',
    'org.tier.organizers': 'Organizers',
    'org.tier.mods': 'Moderators',
    'org.tier.helpers': 'Helpers & casters',
    'org.tier.design': 'Art & design',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderator',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.artDesign': 'Art & design',

    'link.discord': 'Discord',
    'link.rules': 'Rules',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Champions',
    'champions.edition': 'Ditman Cup {year}',
    'champions.champion': 'Champion',
    'champions.runnerUp': 'Runner-up',
    'champions.third': '3rd place',
    'champions.tbd': 'To be confirmed',
    'champions.vod': 'Watch the final',
    'champions.trophyTitle': 'The trophy',
    'champions.trophyPending': 'The Ditman Cup 2027 trophy is still being designed.',

    'clips.title': 'Best clips',
    'clips.intro': 'Highlights from past editions and other tournaments.',
    'clips.empty': "No clips added yet. Got one? Drop it in the Discord.",

    'live.title': 'RE4 runners live',
    'live.intro': 'Community channels running Resident Evil 4 right now.',
    'live.on': 'LIVE',
    'live.off': 'Offline',
    'live.none': 'No channel from the list is live right now.',
    'live.watch': 'Watch on Twitch',
    'live.checking': 'Checking channels…',

    'footer.text': 'Ditman Cup 2027 · Made by the community',

    'testmode': 'TEST MODE · fake data',
  },
};

// Estado en memoria para poder re-renderizar al cambiar de idioma
// Idioma principal: inglés. / Primary language: English.
let currentLang = 'en';
let lastGroupsRows = null;
let lastStandingsRows = null;

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.es;
  let s = dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
  if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
  return s;
}

// Escape básico para texto que viene de la Sheet (evita romper el HTML)
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ======= BANDERAS / FLAGS =======
const COUNTRY_CODES = {
  argentina: 'AR', uruguay: 'UY', chile: 'CL', paraguay: 'PY', bolivia: 'BO', peru: 'PE',
  'perú': 'PE', brazil: 'BR', brasil: 'BR', colombia: 'CO', venezuela: 'VE', ecuador: 'EC',
  mexico: 'MX', 'méxico': 'MX', 'united states': 'US', usa: 'US', 'estados unidos': 'US',
  canada: 'CA', 'canadá': 'CA', spain: 'ES', 'españa': 'ES', portugal: 'PT', france: 'FR',
  'francia': 'FR', germany: 'DE', alemania: 'DE', italy: 'IT', italia: 'IT',
  'united kingdom': 'GB', uk: 'GB', england: 'GB', inglaterra: 'GB', ireland: 'IE',
  netherlands: 'NL', 'países bajos': 'NL', belgium: 'BE', poland: 'PL', polonia: 'PL',
  sweden: 'SE', norway: 'NO', finland: 'FI', denmark: 'DK', 'czech republic': 'CZ',
  czechia: 'CZ', austria: 'AT', switzerland: 'CH', suiza: 'CH', greece: 'GR', turkey: 'TR',
  russia: 'RU', ukraine: 'UA', romania: 'RO', hungary: 'HU', japan: 'JP', 'japón': 'JP',
  'south korea': 'KR', korea: 'KR', corea: 'KR', china: 'CN', taiwan: 'TW', 'hong kong': 'HK',
  indonesia: 'ID', philippines: 'PH', filipinas: 'PH', malaysia: 'MY', thailand: 'TH',
  vietnam: 'VN', india: 'IN', australia: 'AU', 'new zealand': 'NZ', morocco: 'MA',
  marruecos: 'MA', algeria: 'DZ', argelia: 'DZ', egypt: 'EG', 'south africa': 'ZA', israel: 'IL',
};

let _sheetFlags = {};   // { 'nombre en minúscula': 'UY' | '🇺🇾' | 'Uruguay' }

function indexFlags(rows) {
  (rows || []).forEach(r => {
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    const fl = r['Flag'] || r['Bandera'] || r['País'] || r['Pais'] || r['Country'];
    if (name && fl) _sheetFlags[String(name).toLowerCase().trim()] = fl;
  });
}

// Normaliza cualquier entrada (código ISO2 / emoji bandera / nombre de país) -> "uy"
function flagCode(input) {
  if (!input) return '';
  const s = String(input).trim();
  if (!s) return '';
  const ri = [...s].map(c => c.codePointAt(0)).filter(cp => cp >= 0x1F1E6 && cp <= 0x1F1FF);
  if (ri.length === 2) return String.fromCharCode(...ri.map(cp => cp - 0x1F1E6 + 97));
  if (/^[A-Za-z]{2}$/.test(s)) return s.toLowerCase();
  return (COUNTRY_CODES[s.toLowerCase()] || '').toLowerCase();
}

// <span> con la bandera SVG (flag-icons). Vacío si no hay país.
function flagSpan(code) {
  return code ? `<span class="fi fi-${code}" title="${esc(code.toUpperCase())}"></span>` : '';
}

function flagFor(name) {
  const k = String(name || '').toLowerCase().trim();
  return flagCode(_sheetFlags[k]) || flagCode(RUNNER_FLAGS[k]) || '';
}

// Devuelve HTML: "<bandera> Nombre" (nombre escapado)
function nameWithFlag(name) {
  const f = flagSpan(flagFor(name));
  return (f ? f + ' ' : '') + esc(name);
}

// ¿Modo prueba? / Test mode?
function isMock() {
  return TOURNAMENT_CONFIG.mock === true ||
    /[?&]mock=1(&|$)/.test(location.search) ||
    location.hash === '#mock';
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initTabs();
  initFacts();
  initCountdown();
  if (isMock()) showTestBanner();
  loadGroups();
  loadStandings();
  renderBracket();
  renderChampions();
  renderClips();
  renderLive();
});

// ======= IDIOMA / LANGUAGE =======
function initLang() {
  const saved = safeGet('dc-lang');
  // Inglés por defecto; solo recordamos si el visitante eligió español.
  applyLang(saved === 'es' || saved === 'en' ? saved : 'en');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val != null) el.textContent = val;
  });

  // Atributos: data-i18n-attr="aria-label:clave;title:clave2"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s && s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });

  safeSet('dc-lang', currentLang);

  // Re-render de lo dinámico
  renderCountdown();
  const tb = document.getElementById('test-banner');
  if (tb) tb.textContent = t('testmode');
  if (isMock()) {                       // en modo prueba, los datos falsos dependen del idioma
    lastGroupsRows = mockGroupsRows();
    lastStandingsRows = mockStandingsRows();
  }
  if (lastGroupsRows) renderGroups(lastGroupsRows, document.getElementById('groups-grid'));
  else document.getElementById('groups-grid').innerHTML = placeholderGroups();
  if (lastStandingsRows) renderStandings(lastStandingsRows, document.getElementById('standings-table'));
  renderBracket();
  renderChampions();
  renderClips();
  renderLive();
}

function showTestBanner() {
  if (document.getElementById('test-banner')) return;
  const b = document.createElement('div');
  b.id = 'test-banner';
  b.textContent = t('testmode');
  document.body.prepend(b);
}

// ======= NAVEGACIÓN POR PESTAÑAS / TABS =======
function initTabs() {
  const buttons = Array.from(document.querySelectorAll('.tab-btn'));
  const panels = document.querySelectorAll('.tab-panel');
  const toggle = document.getElementById('nav-toggle');
  const tabs = document.getElementById('tabs');

  function activate(btn, focusPanel) {
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.tabIndex = 0;

    const panel = document.getElementById(btn.dataset.tab);
    panel.classList.add('active');
    document.body.dataset.tab = btn.dataset.tab;
    tabs.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (focusPanel) panel.focus();
  }

  buttons.forEach((btn, i) => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    btn.setAttribute('aria-controls', btn.dataset.tab);
    btn.tabIndex = btn.classList.contains('active') ? 0 : -1;

    btn.addEventListener('click', () => activate(btn));

    // Flechas para moverse entre pestañas (patrón ARIA tabs)
    btn.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = buttons[(i + 1) % buttons.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = buttons[(i - 1 + buttons.length) % buttons.length];
      else if (e.key === 'Home') next = buttons[0];
      else if (e.key === 'End') next = buttons[buttons.length - 1];
      if (next) {
        e.preventDefault();
        activate(next);
        next.focus();
      }
    });
  });

  tabs.setAttribute('role', 'tablist');
  document.querySelectorAll('.tab-panel').forEach(p => p.setAttribute('role', 'tabpanel'));

  const active = document.querySelector('.tab-btn.active');
  document.body.dataset.tab = active ? active.dataset.tab : 'inicio';

  toggle.addEventListener('click', () => {
    const open = tabs.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// ======= NÚMEROS DEL HERO / HERO FACTS =======
function initFacts() {
  setText('fact-runners', TOURNAMENT_CONFIG.totalRunners);
  setText('fact-groups', TOURNAMENT_CONFIG.numGroups);
  setText('fact-qualify', TOURNAMENT_CONFIG.qualifiersPerGroup);
}

// ======= CONTADOR / COUNTDOWN =======
let _countdownTarget = null;

function initCountdown() {
  const target = new Date(TOURNAMENT_CONFIG.qualysOpen);
  _countdownTarget = isNaN(target.getTime()) ? null : target;
  renderCountdown();
  if (_countdownTarget) setInterval(renderCountdown, 1000);
}

function renderCountdown() {
  const box = document.getElementById('countdown');
  if (!box || !_countdownTarget) return;

  const dateLine = document.getElementById('countdown-date');
  const locale = currentLang === 'en' ? 'en-US' : 'es-ES';
  const fmtOpts = { day: 'numeric', month: 'long', year: 'numeric' };
  if (TOURNAMENT_CONFIG.qualysTimeZone) fmtOpts.timeZone = TOURNAMENT_CONFIG.qualysTimeZone;
  let pretty;
  try { pretty = _countdownTarget.toLocaleDateString(locale, fmtOpts); }
  catch (e) { pretty = _countdownTarget.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
  if (dateLine) dateLine.textContent = t('countdown.datePrefix') + ' ' + pretty;

  let diff = _countdownTarget.getTime() - Date.now();

  if (diff <= 0) {
    box.classList.add('is-open');
    setText('cd-days', '0'); setText('cd-hours', '00'); setText('cd-mins', '00'); setText('cd-secs', '00');
    return;
  }
  box.classList.remove('is-open');

  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);

  setText('cd-days', String(d));
  setText('cd-hours', String(h).padStart(2, '0'));
  setText('cd-mins', String(m).padStart(2, '0'));
  setText('cd-secs', String(s).padStart(2, '0'));
}

// ======= GRUPOS / GROUPS =======
async function loadGroups() {
  const container = document.getElementById('groups-grid');

  if (isMock()) {
    lastGroupsRows = mockGroupsRows();
    indexFlags(lastGroupsRows);
    renderGroups(lastGroupsRows, container);
    return;
  }
  if (!SHEET_URLS.groups) {
    container.innerHTML = placeholderGroups();
    return;
  }
  try {
    const rows = await fetchCSV(SHEET_URLS.groups);
    lastGroupsRows = rows;
    indexFlags(rows);
    renderGroups(rows, container);
    renderBracket();
  } catch (err) {
    console.error('Error cargando grupos:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('grupos.sheetError')) + '</p>' + placeholderGroups();
  }
}

function letterFor(i) { return String.fromCharCode(65 + i); }

function placeholderGroups() {
  let html = '';
  for (let g = 0; g < TOURNAMENT_CONFIG.numGroups; g++) {
    html += `<div class="group-card"><h3>${esc(t('group.word'))} ${letterFor(g)}</h3><ol>`;
    for (let i = 0; i < TOURNAMENT_CONFIG.groupSize; i++) {
      html += `<li>${esc(t('group.tbd'))}</li>`;
    }
    html += `</ol></div>`;
  }
  return html;
}

// Espera columnas en la Sheet: Grupo, Corredor (una fila por corredor)
function renderGroups(rows, container) {
  const groups = groupRows(rows);
  const keys = Object.keys(groups).sort();
  if (!keys.length) {
    container.innerHTML = placeholderGroups();
    return;
  }

  container.innerHTML = keys.map(g => `
    <div class="group-card">
      <h3>${esc(t('group.word'))} ${esc(g)}</h3>
      <ol>${groups[g].map(n => `<li>${nameWithFlag(n)}</li>`).join('')}</ol>
    </div>
  `).join('');
}

// { "A": ["nombre", ...], ... } a partir de filas {Grupo, Corredor}
function groupRows(rows) {
  const groups = {};
  (rows || []).forEach(r => {
    const g = r['Grupo'] || r['Group'];
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    if (!g || !name) return;
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });
  return groups;
}

// ======= CLASIFICACIÓN / STANDINGS =======
async function loadStandings() {
  const container = document.getElementById('standings-table');

  if (isMock()) {
    lastStandingsRows = mockStandingsRows();
    indexFlags(lastStandingsRows);
    renderStandings(lastStandingsRows, container);
    return;
  }
  if (!SHEET_URLS.standings) return; // se queda con el mensaje por defecto del HTML
  try {
    const rows = await fetchCSV(SHEET_URLS.standings);
    lastStandingsRows = rows;
    indexFlags(rows);
    renderStandings(rows, container);
    renderBracket();
  } catch (err) {
    console.error('Error cargando clasificación:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('clas.sheetError')) + '</p>';
  }
}

function renderStandings(rows, container) {
  // Descartar filas que solo tienen el nº de ranking (sheet vacía todavía)
  const meaningful = r => Object.entries(r).some(([k, v]) =>
    String(v).trim() !== '' && !/^(rank|#|pos|posici[oó]n)$/i.test(k.trim()));
  rows = (rows || []).filter(meaningful);

  if (!rows.length) {
    container.innerHTML = '<p class="loading-msg">' + esc(t('clas.noData')) + '</p>';
    return;
  }
  const headers = Object.keys(rows[0]);
  const isFlagCol = h => /^(flag|bandera|pa[ií]s|country)$/i.test(h);
  const isRunnerCol = h => /^(runner|corredor|nombre|player|jugador)$/i.test(h);

  const cell = (r, h) => {
    const v = r[h];
    if (isFlagCol(h)) { const c = flagCode(v); return c ? flagSpan(c) : esc(v); }
    if (isRunnerCol(h)) return nameWithFlag(v);
    return esc(v);
  };

  container.innerHTML = `
    <table>
      <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(r => `<tr>${headers.map(h =>
          `<td class="${!isFlagCol(h) && !isRunnerCol(h) && r[h] !== '' && !isNaN(r[h]) ? 'num' : ''}">${cell(r, h)}</td>`
        ).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
}

// ======= BRACKET / CUADRO DE ELIMINACIÓN =======
// Se arma a partir de TOURNAMENT_CONFIG: numGroups * qualifiersPerGroup entrantes.
// Con datos (Sheet o mock) muestra nombres; sin datos, casilleros "1A / 2B".
function renderBracket() {
  const host = document.getElementById('bracket-container');
  if (!host) return;

  const G = TOURNAMENT_CONFIG.numGroups;
  const Q = TOURNAMENT_CONFIG.qualifiersPerGroup;
  const nEntrants = G * Q;
  if (nEntrants < 2) { host.innerHTML = `<p>${esc(t('brackets.placeholder'))}</p>`; return; }

  const size = 1 << Math.ceil(Math.log2(nEntrants));   // próxima potencia de 2
  const order = seedOrder(size);                        // orden de siembra 1..size

  // Etiqueta de cada semilla: 1..nEntrants -> "posº Grupo"; resto -> BYE
  const qualified = qualifiedFromData();                // {"A":["n1","n2"], ...} o null
  function seedLabel(seed) {
    if (seed > nEntrants) return { txt: t('bracket.bye'), bye: true };
    const pos = Math.floor((seed - 1) / G) + 1;         // 1 = ganador de grupo
    const letter = letterFor((seed - 1) % G);
    if (qualified && qualified[letter] && qualified[letter][pos - 1]) {
      const nm = qualified[letter][pos - 1];
      return { txt: nm, html: nameWithFlag(nm), bye: false };
    }
    return { txt: pos + (currentLang === 'en' ? '' : 'º') + ' ' + letter, bye: false, tag: pos + letter };
  }

  // Ronda 1: pares (order[0] vs order[1]), (order[2] vs order[3]), ...
  let matches = [];
  for (let i = 0; i < size; i += 2) {
    matches.push([seedLabel(order[i]), seedLabel(order[i + 1])]);
  }

  const rounds = [];
  let teams = size;
  let current = matches;
  while (true) {
    rounds.push({ name: roundName(teams), matches: current });
    if (current.length <= 1) break;
    teams = teams / 2;
    current = new Array(current.length / 2).fill(0).map(() => ([null, null]));
  }

  const html = [
    `<p class="section-note bracket-note">${esc(t('brackets.previewNote', { n: nEntrants }))}</p>`,
    `<div class="bracket-scroll"><div class="bracket" role="group" aria-label="${esc(t('brackets.title'))}">`,
  ];

  rounds.forEach((round, ri) => {
    html.push(`<div class="round" data-round="${ri}"><div class="round-title">${esc(round.name)}</div><div class="round-inner">`);
    round.matches.forEach(m => {
      const a = m[0], b = m[1];
      const slotHtml = x => x ? (x.html || esc(x.txt)) : esc(t('bracket.tbd'));
      html.push(`<div class="match">
        <span class="slot${a && a.bye ? ' is-bye' : ''}">${slotHtml(a)}</span>
        <span class="slot${b && b.bye ? ' is-bye' : ''}">${slotHtml(b)}</span>
      </div>`);
    });
    html.push(`</div></div>`);
  });

  // Columna del campeón
  html.push(`<div class="round round-champion"><div class="round-title">${esc(t('bracket.champion'))}</div><div class="round-inner">
    <div class="match match-champion"><span class="slot">${esc(t('bracket.tbd'))}</span></div>
  </div></div>`);

  html.push(`</div></div>`);
  host.innerHTML = html.join('');
}

// Orden de siembra estándar para un cuadro de `n` (potencia de 2).
function seedOrder(n) {
  let seeds = [1, 2];
  while (seeds.length < n) {
    const sum = seeds.length * 2 + 1;
    const next = [];
    seeds.forEach(s => { next.push(s); next.push(sum - s); });
    seeds = next;
  }
  return seeds;
}

// Nombre de ronda según cuántos entran a esa ronda
function roundName(teams) {
  if (teams === 2) return t('bracket.round.final');
  if (teams === 4) return t('bracket.round.semi');
  if (teams === 8) return t('bracket.round.quarter');
  if (teams === 16) return t('bracket.round.r16');
  if (teams === 32) return t('bracket.round.r32');
  return t('bracket.round.generic', { n: teams });
}

// Top Q de cada grupo, si hay datos cargados. Devuelve {"A":[...], ...} o null.
function qualifiedFromData() {
  const rows = lastStandingsRows;
  const Q = TOURNAMENT_CONFIG.qualifiersPerGroup;

  // 1) Si la clasificación trae Grupo + Corredor + (Pos), usar eso
  if (rows && rows.length) {
    const gCol = pickKey(rows[0], ['Grupo', 'Group']);
    const rCol = pickKey(rows[0], ['Corredor', 'Runner', 'Nombre']);
    if (gCol && rCol) {
      const by = {};
      rows.forEach(r => {
        const g = (r[gCol] || '').trim();
        const name = (r[rCol] || '').trim();
        if (!g || !name) return;
        (by[g] = by[g] || []).push(name);
      });
      const out = {};
      Object.keys(by).forEach(g => { out[g] = by[g].slice(0, Q); });
      if (Object.keys(out).length) return out;
    }
  }

  // 2) Si no, usar el orden de la hoja de grupos (primeros Q de cada grupo)
  const g = groupRows(lastGroupsRows);
  if (Object.keys(g).length) {
    const out = {};
    Object.keys(g).forEach(k => { out[k] = g[k].slice(0, Q); });
    return out;
  }
  return null;
}

function pickKey(obj, names) {
  for (const n of names) if (n in obj) return n;
  return null;
}

// ======= CAMPEONES / PAST CHAMPIONS =======
function renderChampions() {
  const host = document.getElementById('champions-content');
  if (!host) return;

  const podium = (labelKey, name, cls) => `
    <div class="podium-spot ${cls}">
      <div class="podium-medal" aria-hidden="true">${cls === 'gold' ? '🥇' : cls === 'silver' ? '🥈' : '🥉'}</div>
      <div class="podium-role">${esc(t(labelKey))}</div>
      <div class="podium-name">${name ? nameWithFlag(name) : '<span class="tbd">' + esc(t('champions.tbd')) + '</span>'}</div>
    </div>`;

  const editions = PAST_EDITIONS.map(e => `
    <article class="edition">
      <h3 class="edition-year">${esc(t('champions.edition', { year: e.year }))}</h3>
      <div class="podium">
        ${podium('champions.champion', e.champion, 'gold')}
        ${podium('champions.runnerUp', e.runnerUp, 'silver')}
        ${podium('champions.third', e.third, 'bronze')}
      </div>
      ${e.vod ? `<a class="edition-vod" href="${esc(e.vod)}" target="_blank" rel="noopener">${esc(t('champions.vod'))} ↗</a>` : ''}
    </article>`).join('');

  host.innerHTML = `
    <div class="trophy-card">
      <div class="trophy-emoji" aria-hidden="true">🏆</div>
      <div>
        <h3>${esc(t('champions.trophyTitle'))}</h3>
        <p>${esc(t('champions.trophyPending'))}</p>
      </div>
    </div>
    <div class="editions">${editions}</div>
  `;
}

// ======= CLIPS =======
function toEmbed(url) {
  try {
    const u = new URL(url);
    const host = location.hostname;
    if (/youtube\.com$/.test(u.hostname) && u.searchParams.get('v'))
      return 'https://www.youtube.com/embed/' + u.searchParams.get('v');
    if (u.hostname === 'youtu.be')
      return 'https://www.youtube.com/embed/' + u.pathname.slice(1);
    if (/youtube\.com$/.test(u.hostname) && u.pathname.startsWith('/embed/'))
      return url;
    if (u.hostname === 'clips.twitch.tv' && u.pathname.length > 1)
      return `https://clips.twitch.tv/embed?clip=${u.pathname.slice(1)}&parent=${host}`;
    const m = u.pathname.match(/\/clip\/([A-Za-z0-9_-]+)/);
    if (/twitch\.tv$/.test(u.hostname) && m)
      return `https://clips.twitch.tv/embed?clip=${m[1]}&parent=${host}`;
  } catch (e) {}
  return '';
}

function clipUrl(c) {
  return c.url || (c.s ? 'https://clips.twitch.tv/' + c.s : '');
}
function clipEmbed(c) {
  if (c.s) return `https://clips.twitch.tv/embed?clip=${encodeURIComponent(c.s)}&parent=${location.hostname}&autoplay=true`;
  return toEmbed(c.url || '');
}

function renderClips() {
  const host = document.getElementById('clips-grid');
  if (!host) return;

  // Soporta tanto [{section, items:[]}] como un array plano de clips
  const sections = Array.isArray(CLIPS) && CLIPS.length && CLIPS[0].items
    ? CLIPS
    : [{ section: '', items: CLIPS || [] }];

  const total = sections.reduce((n, s) => n + (s.items ? s.items.length : 0), 0);
  if (!total) { host.innerHTML = `<p class="loading-msg">${esc(t('clips.empty'))}</p>`; return; }

  host.innerHTML = sections.filter(s => s.items && s.items.length).map(s => `
    ${s.section ? `<h3 class="clips-section-title">${esc(s.section)} <span class="clips-count">${s.items.length}</span></h3>` : ''}
    <div class="clips-row">
      ${s.items.map((c, i) => {
        const title = c.t || c.title || '';
        const author = c.a || c.author || '';
        const meta = [author && ('by ' + author), c.d, c.v != null && (c.v + ' views')].filter(Boolean).join(' · ');
        return `<figure class="clip">
          <button class="clip-frame clip-play" type="button" data-clip='${esc(JSON.stringify({ s: c.s || '', url: c.url || '' }))}' aria-label="${esc(title || 'clip')}">
            <span class="clip-play-icon" aria-hidden="true">▶</span>
          </button>
          <figcaption><span class="clip-title">${esc(title)}</span>${meta ? `<span class="clip-meta">${esc(meta)}</span>` : ''}</figcaption>
        </figure>`;
      }).join('')}
    </div>`).join('');

  host.querySelectorAll('.clip-play').forEach(btn => {
    btn.addEventListener('click', () => {
      let c; try { c = JSON.parse(btn.dataset.clip); } catch (e) { return; }
      const src = clipEmbed(c);
      if (!src) { window.open(clipUrl(c), '_blank', 'noopener'); return; }
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.allowFullscreen = true;
      frame.title = btn.getAttribute('aria-label') || 'clip';
      btn.replaceWith(frame);
    });
  });
}

// ======= EN VIVO / LIVE (RE4 runners) =======
async function renderLive() {
  const host = document.getElementById('live-grid');
  if (!host) return;
  const channels = RE4_LIVE_CHANNELS.filter(Boolean);
  if (!channels.length) { host.innerHTML = `<p class="loading-msg">${esc(t('live.none'))}</p>`; return; }

  host.innerHTML = `<p class="loading-msg">${esc(t('live.checking'))}</p>`;
  const parent = location.hostname;

  const results = await Promise.all(channels.map(async ch => {
    try {
      const r = await fetch('https://decapi.me/twitch/uptime/' + encodeURIComponent(ch), { cache: 'no-store' });
      const txt = (await r.text()).trim().toLowerCase();
      const live = r.ok && !/offline|not found|error|unable/.test(txt);
      return { ch, live };
    } catch (e) { return { ch, live: false }; }
  }));

  results.sort((a, b) => (b.live - a.live) || a.ch.localeCompare(b.ch));
  const anyLive = results.some(x => x.live);

  host.innerHTML = (anyLive ? '' : `<p class="loading-msg">${esc(t('live.none'))}</p>`) + results.map(({ ch, live }) => live
    ? `<div class="live-card is-live">
         <div class="live-frame"><iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(ch)}&parent=${parent}&muted=true" allowfullscreen title="${esc(ch)}"></iframe></div>
         <div class="live-meta"><span class="live-badge">● ${esc(t('live.on'))}</span> <a href="https://twitch.tv/${encodeURIComponent(ch)}" target="_blank" rel="noopener">${esc(ch)}</a></div>
       </div>`
    : `<a class="live-card is-off" href="https://twitch.tv/${encodeURIComponent(ch)}" target="_blank" rel="noopener">
         <span class="live-name">${esc(ch)}</span><span class="live-status">${esc(t('live.off'))}</span>
       </a>`).join('');
}

// ======= DATOS FALSOS / MOCK DATA =======
const MOCK_NAMES = [
  'ditman', 'kael', 'v1rus', 'Noh', 'requiem', 'SlyFox', 'mercase', 'Trece',
  'Ada_W', 'Krauser', 'luisdlv', 'saddler99', 'ashley', 'wesk3r', 'HUNK', 'Salazar',
  'chris_r', 'jillsandwich', 'nemesis', 'carlos', 'sherry', 'claire', 'birkin', 'annette',
  'leon_k', 'ganado', 'plaga', 'verdugo', 'delLago', 'elGigante', 'novistador', 'regenerador',
];

function mockGroupsRows() {
  const G = TOURNAMENT_CONFIG.numGroups;
  const S = TOURNAMENT_CONFIG.groupSize;
  const rows = [];
  let k = 0;
  for (let g = 0; g < G; g++) {
    for (let i = 0; i < S; i++) {
      rows.push({ Grupo: letterFor(g), Corredor: MOCK_NAMES[k % MOCK_NAMES.length] });
      k++;
    }
  }
  return rows;
}

function mockStandingsRows() {
  const rows = mockGroupsRows();
  const groups = groupRows(rows);
  const out = [];
  Object.keys(groups).sort().forEach(g => {
    groups[g].forEach((name, i) => {
      out.push({
        [t('clas.col.pos')]: String(i + 1),
        [t('clas.col.runner')]: name,
        [t('clas.col.group')]: g,
        [t('clas.col.time')]: mockTime(),
        [t('clas.col.pts')]: String(9 - i * 2),
      });
    });
  });
  return out;
}

function mockTime() {
  const m = 5 + Math.floor(Math.random() * 3);
  const s = Math.floor(Math.random() * 60);
  const ms = Math.floor(Math.random() * 1000);
  return `${m}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

// ======= CSV: fetch + parseo robusto / robust parsing =======
// Soporta: comas dentro de comillas, comillas escapadas (""), CRLF, BOM,
// líneas vacías y salto final. / Handles quoted commas, "" escapes, CRLF, BOM, blank lines.
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);   // BOM
  const rows = [];
  let row = [], field = '', inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvToObjects(text) {
  const rows = parseCSV(text).filter(r => r.some(c => c.trim() !== ''));  // sin filas vacías
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => { o[h] = (r[i] != null ? r[i] : '').trim(); });
    return o;
  });
}

async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Sheet HTTP ' + res.status);
  return csvToObjects(await res.text());
}

// ======= UTILIDADES / UTILITIES =======
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
