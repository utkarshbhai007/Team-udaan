const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// All AI Routes
router.post('/generate-report', aiController.generateReport);
router.post('/analyze-side-effects', aiController.analyzeSideEffects);
router.post('/check-interaction', aiController.analyzeDrugInteraction);
router.post('/recommend-drugs', aiController.recommendDrugs);
router.post('/predict-risk', aiController.predictRisk);
router.post('/quality-check', aiController.performQualityCheck);
router.post('/coordinate-care', aiController.coordinateCare);

module.exports = router;
