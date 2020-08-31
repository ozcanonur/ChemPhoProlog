const kinaseIds = {
  AAK1: 'Q2M2I8',
  ABL1: 'P00519',
  ABL2: 'P42684',
  ADCK1: 'Q86TW2',
  AKT1: 'P31749',
  AKT2: 'P31751',
  AKT3: 'Q9Y243',
  ALK: 'Q9UM73',
  ALPK3: 'Q96L96',
  ANTXR1: 'Q9H6X2',
  ARAF: 'P10398',
  ATM: 'Q13315',
  ATR: 'Q13535',
  AURKA: 'O14965',
  AURKB: 'Q96GD4',
  AURKC: 'Q9UQB9',
  BARK: 'P25098',
  BCKDK: 'O14874',
  BMP2K: 'Q9NSY1',
  BRAF: 'P15056',
  BRSK1: 'Q8TDC3',
  BRSK2: 'Q8IWQ3',
  BTK: 'Q06187',
  BUB1: 'O43683',
  BUB1B: 'O60566',
  CAMK1: 'Q14012',
  CAMK1D: 'Q8IU85',
  CAMK2A: 'Q9UQM7',
  CAMK2B: 'Q13554',
  CAMK2D: 'Q13557',
  CAMK2G: 'Q13555',
  CAMK4: 'Q16566',
  CAMKK1: 'Q8N5S9',
  CAMKK2: 'Q96RR4',
  CAMKV: 'Q8NCB2',
  CASK: 'O14936',
  CDC42BPA: 'Q5VT25',
  CDC42BPB: 'Q9Y5S2',
  CDC42BPG: 'Q6DT37',
  CDC7: 'O00311',
  CDK1: 'P06493',
  CDK11A: 'Q9UQ88',
  CDK11B: 'P21127',
  CDK12: 'Q9NYV4',
  CDK13: 'Q14004',
  CDK14: 'O94921',
  CDK15: 'Q96Q40',
  CDK16: 'Q00536',
  CDK17: 'Q00537',
  CDK18: 'Q07002',
  CDK19: 'Q9BWU1',
  CDK2: 'P24941',
  CDK20: 'Q8IZL9',
  CDK3: 'Q00526',
  CDK4: 'P11802',
  CDK5: 'Q00535',
  CDK6: 'Q00534',
  CDK7: 'P50613',
  CDK9: 'P50750',
  CDKL5: 'O76039',
  CHEK1: 'O14757',
  CHEK2: 'O96017',
  CHUK: 'O15111',
  CIT: 'O14578',
  CLASP1: 'Q7Z460',
  CLK1: 'P49759',
  CLK2: 'P49760',
  CLK3: 'P49761',
  CLK4: 'Q9HAZ1',
  CSK: 'P41240',
  CSNK1A1: 'P48729',
  CSNK1A1L: 'Q8N752',
  CSNK1D: 'P48730',
  CSNK1E: 'P49674',
  CSNK1G3: 'Q9Y6M4',
  CSNK2A1: 'P68400',
  CSNK2A2: 'P19784',
  CSNK2A3: 'Q8NEV1',
  CSNK2B: 'P67870',
  DAPK1: 'P53355',
  DAPK2: 'Q9UIK4',
  DAPK3: 'O43293',
  DCAF1: 'Q9Y4B6',
  DCLK1: 'O15075',
  DCLK3: 'Q9C098',
  DDR1: 'Q08345',
  DDR2: 'Q16832',
  DMPK: 'Q09013',
  DYRK1A: 'Q13627',
  DYRK2: 'Q92630',
  DYRK3: 'O43781',
  DYRK4: 'Q9NR20',
  EEF2K: 'O00418',
  EGFR: 'P00533',
  EIF2AK1: 'Q9BQI3',
  EIF2AK2: 'P19525',
  EIF2AK3: 'Q9NZJ5',
  EIF2AK4: 'Q9P2K8',
  EPHA1: 'P21709',
  EPHA2: 'P29317',
  EPHA4: 'P54764',
  EPHB2: 'P29323',
  EPHB3: 'P54753',
  EPHB4: 'P54760',
  ERBB2: 'P04626',
  ERBB3: 'P21860',
  ERN1: 'O75460',
  FAK2: 'Q14289',
  FAM20C: 'Q8IXL6',
  FER: 'P16591',
  FES: 'P07332',
  FGFR1: 'P11362',
  FGFR3: 'P22607',
  FGR: 'P09769',
  FLT: 'P17948',
  FLT3: 'P36888',
  FLT4: 'P35916',
  FYN: 'P06241',
  GAK: 'O14976',
  GAPDH: 'P04406',
  GRK1: 'Q15835',
  GRK3: 'P35626',
  GRK5: 'P34947',
  GRK6: 'P43250',
  GRK7: 'Q8WTQ7',
  GSG2: 'Q8TF76',
  GSK3A: 'P49840',
  GSK3B: 'P49841',
  HCK: 'P08631',
  HIPK1: 'Q86Z02',
  HIPK2: 'Q9H2X6',
  HIPK3: 'Q9H422',
  HIPK4: 'Q8NE63',
  ICK: 'Q9UPZ9',
  IGF1R: 'P08069',
  IKBKB: 'O14920',
  IKBKE: 'Q14164',
  ILK: 'Q13418',
  INSR: 'P06213',
  IRAK1: 'P51617',
  IRAK4: 'Q9NWZ3',
  ITK: 'Q08881',
  JAK1: 'P23458',
  JAK2: 'O60674',
  JAK3: 'P52333',
  KALRN: 'O60229',
  KDR: 'P35968',
  KIT: 'P10721',
  KSR1: 'Q8IVT5',
  LATS1: 'O95835',
  LATS2: 'Q9NRM7',
  LCK: 'P06239',
  LIMK1: 'P53667',
  LIMK2: 'P53671',
  LRRK1: 'Q38SD2',
  LYN: 'P07948',
  MAK: 'P20794',
  MAP2K1: 'Q02750',
  MAP2K2: 'P36507',
  MAP2K3: 'P46734',
  MAP2K4: 'P45985',
  MAP2K5: 'Q13163',
  MAP2K6: 'P52564',
  MAP2K7: 'O14733',
  MAP3K1: 'Q13233',
  MAP3K10: 'Q02779',
  MAP3K11: 'Q16584',
  MAP3K14: 'Q99558',
  MAP3K15: 'Q6ZN16',
  MAP3K19: 'Q56UN5',
  MAP3K2: 'Q9Y2U5',
  MAP3K20: 'Q9NYL2',
  MAP3K21: 'Q5TCX8',
  MAP3K3: 'Q99759',
  MAP3K5: 'Q99683',
  MAP3K7: 'O43318',
  MAP3K8: 'P41279',
  MAP3K9: 'P80192',
  MAP4K1: 'Q92918',
  MAP4K2: 'Q12851',
  MAP4K3: 'Q8IVH8',
  MAP4K4: 'O95819',
  MAP4K5: 'Q9Y4K4',
  MAPK1: 'P28482',
  MAPK10: 'P53779',
  MAPK11: 'Q15759',
  MAPK12: 'P53778',
  MAPK13: 'O15264',
  MAPK14: 'Q16539',
  MAPK15: 'Q8TD08',
  MAPK3: 'P27361',
  MAPK4: 'P31152',
  MAPK6: 'Q16659',
  MAPK7: 'Q13164',
  MAPK8: 'P45983',
  MAPK9: 'P45984',
  MAPKAPK2: 'P49137',
  MAPKAPK3: 'Q16644',
  MAPKAPK5: 'Q8IW41',
  MARK1: 'Q9P0L2',
  MARK2: 'Q7KZI7',
  MARK3: 'P27448',
  MARK4: 'Q96L34',
  MAST1: 'Q9Y2H9',
  MAST2: 'Q6P0Q8',
  MAST3: 'O60307',
  MAST4: 'O15021',
  MASTL: 'Q96GX5',
  MATK: 'P42679',
  MELK: 'Q14680',
  MET: 'P08581',
  MINK1: 'Q8N4C8',
  MKNK2: 'Q9HBH9',
  MLKL: 'Q8NB16',
  MOK: 'Q9UQ07',
  MST1: 'P26927',
  MTOR: 'P42345',
  MYLK: 'Q15746',
  MYLK3: 'Q32MK0',
  NEK1: 'Q96PY6',
  NEK10: 'Q6ZWH5',
  NEK11: 'Q8NG66',
  NEK2: 'P51955',
  NEK3: 'P51956',
  NEK4: 'P51957',
  NEK6: 'Q9HC98',
  NEK7: 'Q8TDX7',
  NEK9: 'Q8TD19',
  NLK: 'Q9UBE8',
  NPR2: 'P20594',
  NR4A3: 'Q92570',
  NRBP1: 'Q9UHY1',
  NRBP2: 'Q9NSY0',
  NRK: 'Q7Z2Y5',
  NTRK1: 'P04629',
  NTRK2: 'Q16620',
  NTRK3: 'Q16288',
  NUAK1: 'O60285',
  NUAK2: 'Q9H093',
  OXSR1: 'O95747',
  PAK1: 'Q13153',
  PAK2: 'Q13177',
  PAK3: 'O75914',
  PAK4: 'O96013',
  PAK5: 'Q9P286',
  PAK6: 'Q9NQU5',
  PAN3: 'Q58A45',
  PASK: 'Q96RG2',
  PBK: 'Q96KB5',
  PDGFRA: 'P16234',
  PDGFRB: 'P09619',
  PDK1: 'Q15118',
  PDK2: 'Q15119',
  PDK3: 'Q15120',
  PDK4: 'Q16654',
  PDPK1: 'O15530',
  PDPK2P: 'Q6A1A2',
  PEAK1: 'Q9H792',
  PHKA1: 'P46020',
  PHKB: 'Q93100',
  PHKG2: 'P15735',
  PIK3C2B: 'O00750',
  PIK3C2G: 'O75747',
  PIK3C3: 'Q8NEB9',
  PIK3CA: 'P42336',
  PIK3CB: 'P42338',
  PIK3CD: 'O00329',
  PIK3CG: 'P48736',
  PIK3R4: 'Q99570',
  PIKFYVE: 'Q9Y2I7',
  PIM1: 'P11309',
  PIM2: 'Q9P1W9',
  PIM3: 'Q86V86',
  PINK1: 'Q9BXM7',
  PKDCC: 'Q504Y2',
  PKMYT1: 'Q99640',
  PKN1: 'Q16512',
  PKN2: 'Q16513',
  PLK1: 'P53350',
  PLK2: 'Q9NYY3',
  PLK3: 'Q9H4B4',
  PLK4: 'O00444',
  POMK: 'Q9H5K3',
  PRKAA1: 'Q13131',
  PRKAA2: 'P54646',
  PRKAB1: 'Q9Y478',
  PRKACA: 'P17612',
  PRKACB: 'P22694',
  PRKCA: 'P17252',
  PRKCB: 'P05771',
  PRKCD: 'Q05655',
  PRKCE: 'Q02156',
  PRKCG: 'P05129',
  PRKCH: 'P24723',
  PRKCI: 'P41743',
  PRKCQ: 'Q04759',
  PRKCZ: 'Q05513',
  PRKD1: 'Q15139',
  PRKD2: 'Q9BZL6',
  PRKD3: 'O94806',
  PRKDC: 'P78527',
  PRKG1: 'Q13976',
  PRKG2: 'Q13237',
  PRKX: 'P51817',
  PRPF4B: 'Q13523',
  PRPK: 'Q96S44',
  PTK2: 'Q05397',
  PTK6: 'Q13882',
  PTK7: 'Q13308',
  RAF1: 'P04049',
  RET: 'P07949',
  RIOK1: 'Q9BRS2',
  RIOK2: 'Q9BVS4',
  RIOK3: 'O14730',
  RIPK1: 'Q13546',
  RIPK2: 'O43353',
  RIPK3: 'Q9Y572',
  RNASEL: 'Q05823',
  ROCK1: 'Q13464',
  ROCK2: 'O75116',
  ROR1: 'Q01973',
  ROR2: 'Q01974',
  RPS6KA1: 'Q15418',
  RPS6KA2: 'Q15349',
  RPS6KA3: 'P51812',
  RPS6KA4: 'O75676',
  RPS6KA5: 'O75582',
  RPS6KA6: 'Q9UK32',
  RPS6KB1: 'P23443',
  RPS6KC1: 'Q96S38',
  RPS6KL1: 'Q9Y6S9',
  RYK: 'P34925',
  SCYL2: 'Q6P3W7',
  SCYL3: 'Q8IZE3',
  SERPINA2: 'P20848',
  SGK1: 'O00141',
  SGK3: 'Q96BR1',
  SIK1: 'P57059',
  SIK2: 'Q9H0K1',
  SIK3: 'Q9Y2K2',
  SLK: 'Q9H2G2',
  SLTM: 'Q9NWH9',
  SMG1: 'Q96Q15',
  SNRK: 'Q9NRH2',
  SPEG: 'Q15772',
  SRC: 'P12931',
  SRPK1: 'Q96SB4',
  SRPK2: 'P78362',
  SRPK3: 'Q9UPE1',
  STK10: 'O94804',
  STK11: 'Q15831',
  STK16: 'O75716',
  STK17A: 'Q9UEE5',
  STK17B: 'O94768',
  STK24: 'Q9Y6E0',
  STK25: 'O00506',
  STK26: 'Q9P289',
  STK3: 'Q13188',
  STK32C: 'Q86UX6',
  STK33: 'Q9BYT3',
  STK38: 'Q15208',
  STK38L: 'Q9Y2H1',
  STK39: 'Q9UEW8',
  STK4: 'Q13043',
  SYK: 'P43405',
  TAOK1: 'Q7L7X3',
  TAOK3: 'Q9H2K8',
  TBK1: 'Q9UHD2',
  TEC: 'P42680',
  TESK2: 'Q96S53',
  TGFBR1: 'P36897',
  TGFBR2: 'P37173',
  TIE1: 'P35590',
  TLK1: 'Q9UKI8',
  TLK2: 'Q86UE8',
  TNIK: 'Q9UKE5',
  TNK1: 'Q13470',
  TNK2: 'Q07912',
  TNNI3K: 'Q59H18',
  TRIO: 'O75962',
  TRPM7: 'Q96QT4',
  TTBK1: 'Q5TCY1',
  TTK: 'P33981',
  TTN: 'Q8WZ42',
  TXK: 'P42681',
  TYK2: 'P29597',
  UHMK1: 'Q8TAS1',
  ULK1: 'O75385',
  ULK3: 'Q6PHR2',
  VRK1: 'Q99986',
  VRK2: 'Q86Y07',
  VRK3: 'Q8IV63',
  WEE1: 'P30291',
  WNK1: 'Q9H4A3',
  WNK2: 'Q9Y3S1',
  WNK3: 'Q9BYP7',
  WNK4: 'Q96J92',
  YES1: 'P07947',
  ZHX2: 'Q9Y6X8',
};

export default kinaseIds;