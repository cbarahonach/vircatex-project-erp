import { Router } from 'express';
import { dirname } from 'path';

const router = Router();

router.get('/excel/FormatoExcelReporteTextil', function (req, res) {
    res.download(`./public/default/Formato_Textil.xlsx`);
})

router.get('/excel/FormatoExcelReporteManufactura', function (req, res) {
    res.download(`./public/default/Formato_Manufactura.xlsx`);
})

export default router;