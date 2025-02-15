import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const fileExtension = ".xlsx";

export const excelDownload = async ({
  excelTemplate,
  fileName,
}: {
  excelTemplate: XLSX.WorkBook;
  fileName: string;
}) => {
  // 1. 엑셀 파일 Blob 생성
  const excelFile = await getExcelFile(excelTemplate);

  // 2. 파일 다운로드 실행
  FileSaver.saveAs(excelFile, fileName + fileExtension);
};

async function getExcelFile(excelTemplate: XLSX.WorkBook) {
  // 1. 엑셀 데이터를 배열(ArrayBuffer)로 변환
  const excelBuffer = XLSX.write(excelTemplate, {
    bookType: "xlsx",
    type: "array",
  });

  // 2. XlsxPopulate를 사용하여 워크북 변환
  const workbook = await XlsxPopulate.fromDataAsync(excelBuffer);

  // 3. Blob 타입으로 변환
  const excelFile = (await workbook.outputAsync()) as Blob;

  return excelFile;
}
