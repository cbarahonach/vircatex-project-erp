import moment from 'moment';
import fs from 'fs';
import { dirname } from 'path';

export default {
    saveImage(extension, base64, section = 'DEFAULT') {
        const imgName = `${section}-${moment().format('YYYYMMDDHHmmss')}.${extension}`;
        let base64Data = '';

        switch (extension) {
            case 'png':
                base64Data = base64.replace(/^data:image\/png;base64,/, "");
                break;
            case 'jpg':
                base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
                break;
            case 'jpeg':
                base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
                break;
            case 'pdf':
                base64Data = base64.replace(/^data:application\/pdf;base64,/, "");
                break;
            case 'xls':
                base64Data = base64.replace(/^data:application\/vnd.ms-excel;base64,/, "");
                break;
            case 'xlsx':
                base64Data = base64.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, "");
                break;
        }

        this.writeFile(`./public/images/${imgName}`, base64Data);

        return imgName;
    },
    writeFile(path, contents) {
        fs.promises.mkdir(dirname(path), { recursive: true })
            .then(x => fs.promises.writeFile(path, contents, 'base64'));
    },
    zfill(number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */ 
        var zero = "0"; /* String de cero */  
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
    }
}