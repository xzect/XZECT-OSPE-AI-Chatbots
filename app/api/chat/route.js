import { getChatResponse } from '../../../lib/openai';

export async function POST(request) {
  const { message } = await request.json();

  const healthKeywords = [
    "fever", "cough", "headache", "fatigue", "dizziness", "nausea", "vomiting", "diarrhea", "pain", "cramps",
    "chills", "sweats", "rash", "itching", "sore", "throat", "congestion", "runny", "nose", "sneezing",
    "wheezing", "shortness", "breath","breathe", "chest", "tightness", "palpitations", "bloating", "gas", "indigestion", "heartburn",
    "constipation", "anxiety", "depression", "insomnia", "tremors", "seizures", "weakness", "paralysis", "numbness", "tingling",
    "blurred", "vision", "hearing", "loss", "earache", "tinnitus", "swelling", "bruising", "bleeding", "inflammation",
    "stiffness", "joint", "redness", "burning", "sensitivity", "light", "sound", "smell", "taste", "appetite",
    "loss", "weight","causes","symptoms","feeling","feel","bad","nose","ears","ear","tongue","eyes","mouth","lips", "hair", "loss", "dry", "skin", "pale", "yellowing", "jaundice", "sweating",
    "feverish", "chill", "thirst", "hydration", "dehydration", "faint","fainting","fingers","hands","legs","shoulders","back","hurting","hurt", "collapse", "shock", "confusion", "delirium",
    "memory", "loss", "concentration", "focus", "speech", "difficulty", "slurred", "speech", "hoarseness", "coughing",
    "blood", "phlegm", "mucus", "sputum", "wheezing", "breathlessness", "hyperventilation", "snoring", "apnea", "cyanosis",
    "trembling", "shaking", "rigidity", "clumsiness", "coordination", "dizziness", "vertigo", "lightheadedness", "faintness",
    "nauseous", "queasiness", "retching", "upset", "stomach", "diarrheal", "constipated", "bowel", "movement", "irregular",
    "bloated", "flatulence", "heartburn", "indigestion", "acidity", "belching", "cramping", "colicky", "appendicitis", "gastritis",
    "ulcer", "hernia", "esophagitis", "colitis", "enteritis", "hepatitis", "cirrhosis", "pancreatitis", "cholecystitis", "nephritis",
    "cystitis", "prostatitis", "urethritis", "pyelonephritis", "glomerulonephritis", "arthritis", "osteoporosis", "osteomalacia", "rheumatism", "lupus",
    "sclerosis", "scleroderma", "fibromyalgia", "myositis", "dermatitis", "eczema", "psoriasis", "acne", "rosacea", "urticaria",
    "hives", "alopecia", "vitiligo", "melanoma", "carcinoma", "sarcoma", "lymphoma", "leukemia", "anemia", "thalassemia",
    "sickle", "cell", "polycythemia", "hemophilia", "thrombocytopenia", "leukopenia", "lymphopenia", "sepsis", "toxemia", "bacteremia",
    "viremia", "fungemia", "parasitemia", "endocarditis", "myocarditis", "pericarditis", "aortitis", "vasculitis", "phlebitis", "thrombosis",
    "embolism", "ischemia", "angina", "myocardial", "infarction", "heart", "attack", "stroke", "aneurysm", "arrhythmia",
    "tachycardia", "bradycardia", "hypertension", "hypotension", "shock", "syncope", "concussion", "contusion", "fracture", "sprain",
    "strain", "dislocation", "burn", "laceration", "abrasion", "puncture", "wound", "ulceration", "infection", "cellulitis",
    "abscess", "boil", "carbuncle", "furuncle", "gangrene", "necrosis", "osteomyelitis", "septicemia", "pyemia", "toxemia",
    "poisoning", "intoxication", "overdose", "dependency", "addiction", "abuse", "misuse", "malnutrition", "deficiency",
    "scurvy", "rickets", "pellagra", "beriberi", "kwashiorkor", "marasmus", "hypoglycemia", "hyperglycemia", "diabetes", "hypothyroidism",
    "hyperthyroidism", "goiter", "thyroiditis", "adrenalitis", "cushing", "addison", "hyper", "parathyroidism", "hypoparathyroidism", "pituitary", "adenoma",
    "acromegaly", "gigantism", "dwarfism", "hypopituitarism", "hypogonadism", "polycystic", "ovary", "endometriosis", "fibroids",
    "menopause", "andropause", "infertility", "sterility", "pregnancy", "miscarriage", "stillbirth", "ectopic", "preeclampsia", "eclampsia",
    "gestational", "diabetes", "hyperemesis", "gravidarum", "placenta", "previa", "abruption", "amniotic", "fluid", "polyhydramnios",
    "oligohydramnios", "preterm", "labor", "postpartum", "depression", "mastitis", "lactation", "failure", "jaundice", "neonatal",
    "infant", "mortality", "sudden", "death", "autism", "asperger", "dyslexia",
    "dyspraxia", "epilepsy", "cerebral", "palsy", "muscular", "dystrophy", "fragile",
    "turner", "klinefelter", "prader", "willi", "angelman", "beckwith", "wiedemann",
    "cystic", "fibrosis", "sickle", "cell", "thalassemia",
    "krabbe", "gaucher", "neimann", "huntington", "alzheimer", "parkinson", "sclerosis", "amyotrophic",
    "lateral", "sclerosis", "myasthenia", "gravis", "guillain", "barre", "encephalitis", "meningitis", "poliomyelitis",
    "rabies", "tetanus", "botulism", "diphtheria", "pertussis", "measles", "mumps", "rubella", "varicella", "zoster",
    "hepatitis", "herpes", "simplex", "human", "papillomavirus",
    "hiv", "aids", "syphilis", "gonorrhea", "chlamydia", "trichomoniasis", "candidiasis", "bacterial", "vaginosis", "pelvic",
    "inflammatory", "prostatitis", "epididymitis", "orchitis", "balanitis", "phimosis", "paraphimosis", "urethritis", "cystitis",
    "pyelonephritis", "nephrolithiasis", "urolithiasis", "hydronephrosis", "polycystic", "kidney", "glomerulonephritis", "renal", "failure",
    "nephrotic", "nephritic", "acute", "chronic", "dialysis", "transplant", "rejection", "hyperplasia", "carcinoma",
    "sarcoma", "lymphoma", "leukemia", "melanoma", "glioma", "neuroblastoma", "retinoblastoma", "medulloblastoma", "meningioma", "pituitary",
    "adenoma", "schwannoma", "paraganglioma", "pheochromocytoma", "thyroid", "adenoma", "parathyroid", "pituitary", "insufficiency", "hypoparathyroidism",
    "hyperparathyroidism", "adrenal", "insufficiency", "cushing", "addison", "pheochromocytoma", "diabetes", "insipidus",
    "neurogenic", "nephrogenic", "gestational", "diabetes", "mellitus", "latent", "autoimmune",
    "thyroid", "hormone", "resistance", "congenital", "hypothyroidism", "hyperthyroidism", "thyroiditis", "grave", "hashimoto",
    "thyroiditis", "subacute", "thyroiditis", "postpartum", "pain", "suppurative", "reidel", "thyroiditis", "multinodular",
    "goiter", "diffuse", "toxic", "nodular", "hyperfunctioning", "nodule", "hypofunctioning", "thyroid",
    "neoplasm", "adenoma", "follicular", "papillary", "medullary", "anaplastic", "parathyroid", "adenoma", "hyperplasia", "parathyroid",
    "carcinoma", "euthyroid", "sick", "hypocalcemia", "hypercalcemia", "addison",
    "cushing", "pheochromocytoma", "secondary", "adrenal", "insufficiency", "congenital", "adrenal", "hyperplasia", "hypoaldosteronism",
    "hyperaldosteronism", "hypogonadism", "hypergonadism", "amenorrhea", "oligomenorrhea", "polymenorrhea", "menorrhagia", "metrorrhagia", "postmenopausal",
    "bleeding", "infertility", "contraception", "sterilization", "menopausal", "hormone", "therapy", "hirsutism", "gynecomastia", "breast",
    "pain", "lump", "nipple", "discharge", "fibroadenoma", "phyllodes", "tumor", "breast", "carcinoma", "ductal",
    "lobular", "invasive", "noninvasive", "paget", "mastitis", "abscess", "gynecomastia", "mastectomy", "lumpectomy",
    "chemotherapy", "radiation", "therapy", "hormone", "therapy", "targeted", "therapy", "immunotherapy", "bone", "marrow",
    "transplant", "stem", "cell", "transplant", "prostate", "carcinoma", "benign", "prostatic", "hyperplasia", "prostatitis",
    "epididymitis", "orchitis", "hydrocele", "varicocele", "testicular", "torsion", "inguinal", "hernia", "penile", "fracture",
    "erectile", "dysfunction", "priapism", "penile", "carcinoma", "testicular", "carcinoma", "seminoma", "nonseminoma", "embryonal",
    "carcinoma", "teratoma", "choriocarcinoma", "yolk", "sac", "tumor", "prostatic", "adenocarcinoma", "transitional", "cell",
    "carcinoma", "neuroendocrine", "tumor", "adrenocortical", "carcinoma", "pheochromocytoma", "paraganglioma", "thyroid", "carcinoma", "medullary",
    "anaplastic", "papillary", "follicular", "parathyroid", "carcinoma", "melanoma", "basal", "cell", "carcinoma", "squamous",
    "cell", "carcinoma", "kaposi", "sarcoma", "merkel", "cell", "carcinoma", "cutaneous", "cell", "lymphoma",
    "mycosis", "fungoides", "sezary", "syndrome", "plasma", "cell", "dyscrasia", "myeloma", "amyloidosis",
    "waldenstrom", "macroglobulinemia", "monoclonal", "gammopathy", "undetermined", "significance", "disease",
    "heavy", "chain", "extramedullary", "plasmacytoma", "solitary", "bone", "plasmacytoma", "amyloidosis",
    "secondary", "amyloidosis", "familial", "amyloidosis", "senile", "amyloidosis", "localized", "amyloidosis", "liver", "cirrhosis",
    "alcoholic", "cirrhosis", "nonalcoholic", "fatty", "liver", "nonalcoholic", "steatohepatitis", "hepatitis", "hepatitis",
    , "autoimmune", "hepatitis", "biliary",
    "cholangitis", "sclerosing", "cholangitis", "hemochromatosis", "antitrypsin",
    "deficiency",
    "acute", "liver", "failure", "chronic", "liver", "failure", "portal", "hypertension", "ascites", "hepatic",
    "encephalopathy", "hepatorenal", "spontaneous", "bacterial", "peritonitis", "hepatocellular", "carcinoma", "cholangiocarcinoma", "gallbladder",
    "carcinoma", "extrahepatic", "cholangiocarcinoma", "intrahepatic", "cholangiocarcinoma", "pancreatic", "adenocarcinoma", "pancreatic", "neuroendocrine",
    "tumor", "insulinoma", "gastrinoma", "glucagonoma", "somatostatinoma", "autoimmune", "pancreatitis", "hereditary",
    "pancreatitis", "acute", "pancreatitis", "chronic", "pancreatitis", "pancreatic", "insufficiency", "diabetes", "mellitus", "pancreatic",
    "diabetes", "postpancreatectomy", "diabetes", "metabolic", "obesity", "overweight", "hyperlipidemia", "dyslipidemia", "hypercholesterolemia",
    "hypertriglyceridemia", "hypolipoproteinemia", "hyperuricemia", "gout", "nephrolithiasis", "gouty", "arthritis", "chronic", "kidney",
    "stage", "renal", "dialysis", "peritoneal", "dialysis", "hemodialysis", "renal", "transplantation",
    "immunosuppression", "transplant", "rejection", "hyperacute", "rejection", "acute", "rejection", "chronic", "rejection", "graft",
    "bone", "marrow", "transplantation", "stem", "cell", "transplantation", "immunodeficiency",
    "immunodeficiency", "secondary", "immunodeficiency", "hiv", "aids", "congenital", "agammaglobulinemia", "common", "variable", "immunodeficiency",
    "subclass", "deficiency", "selective", "hyper",
    "severe", "combined", "immunodeficiency",
    "bare", "lymphocyte", "hyper", "immunoglobulin",
    "immunodeficiency", "transient", "hypogammaglobulinemia", "infancy", "agammaglobulinemia", "severe",
    "combined", "immunodeficiency", "hyper", "bruton", "agammaglobulinemia", "selective",
    "deficiency", "selective", "iga", "deficiency", "chronic", "granulomatous", "leukocyte", "adhesion", "deficiency",
    "chediak", "higashi", "hereditary", "angioedema", "hyper", "hyper", "igm",
    "wiskott", "aldrich", "ataxia", "telangiectasia", "severe", "combined", "immunodeficiency"
    , "linked", "agammaglobulinemia", "hyper", "linked", "lymphoproliferative",
    "alps", "autoimmune", "lymphoproliferative",
    "carney", "congenital", "blood","hair","nails","lungs","bones",
    "hallermann", "streiff", "hereditary", "hemorrhagic",
  ];
  function containsHealthKeywords(paragraph) {
    const lowerCaseParagraph = paragraph.toLowerCase();

    for (const keyword of healthKeywords) {
      if (lowerCaseParagraph.includes(keyword)) {
        return true;
      }
    }
    return false;
  }
  if (containsHealthKeywords(message)) {
    try {
      const reply = await getChatResponse(message);
      return new Response(JSON.stringify({ reply }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error fetching response from AI API' }), { status: 500 });
    }
  } else {
    const reply = "I'm a symptom checker bot and I can help you with health and illness related information. If you're interested in any health symptoms, or learning about health, feel free to ask!. If you are Searching for any symptoms make sure to check spellings, Bot don't check for incorrect spellings.";
    return new Response(JSON.stringify({ reply }), { status: 200 });
  }
}
