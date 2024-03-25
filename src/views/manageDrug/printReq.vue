<template>
  <div id="app"></div>
</template>

<script>
import pdfMake from 'pdfmake'
import {onMounted} from "vue";
import pdfFonts from '../../assets/custom-fonts';

export default {
  name: 'App',
  setup() {

    const exportPdf = async () => {



      const docDefinition = {
        info: {
          title: `ใบเบิกยา`,
          author: 'แผนกเภสัช',
          subject: 'ุ-',
          keywords: `request`,
        },
        pageSize: {width: 210, height: 297},
        // pageSize: {width: sizeWidthPage.value, height: sizePages.value},
        pageOrientation: 'portrait',
        // left , top, right, bottom
        pageMargins: [0, 0, 0, 10],

        content: [
          'loop',
          'สวัสดีครับ'
        ],
        styles: {
          header: {fontSize: 2, bold: true,},
          lineItem: {fontSize: 2, bold: false,},
          leftText: {fontSize: 2},
          // header: {fontSize: fSize.value, bold: true,},
          // lineItem: {fontSize: fSize.value, bold: false,},
          // leftText: {fontSize: fSize.value,},
          anotherStyle: {italics: true,},
        },
        defaultStyle: {font: 'Sarabun',},
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        },
        Sarabun: {
          normal: 'Sarabun-Medium.ttf',
          bold: 'Sarabun-ExtraBold.ttf',
          italics: 'Sarabun-Italic.ttf',
          bolditalics: 'Sarabun-ExtraBoldItalic.ttf',
        },

      }
      pdfMake.createPdf(docDefinition).open({}, window);
      // console.log(queryParam.value)
      return {
        // queryParam
      };
    }

    onMounted(() => {
      exportPdf();
    });
    return {
    }
  }
  }
</script>