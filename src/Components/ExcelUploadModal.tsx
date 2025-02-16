import { cloneDeep, isUndefined } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import Dropzone, { Accept } from "react-dropzone";
import styled from "styled-components";
import * as XLSX from "xlsx";

import { IData } from "../App";

const gameCharacterKeys: Array<keyof IGameCharacter> = [
  "name",
  "class",
  "level",
  "health",
  "mana",
  "attackPower",
  "defense",
  "creationDate",
];

const productKeys: Array<keyof IProduct> = [
  "productName",
  "category",
  "price",
  "stock",
  "registeredDate",
];

const customerOrderKeys: Array<keyof ICustomerOrder> = [
  "customerName",
  "productName",
  "quantity",
  "price",
  "orderDate",
  "status",
];

const accept: Accept = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xls",
    ".xlsx",
  ],
};

interface IProps {
  selectedKey: TKey;
  selectedFieldLabels: Record<string, string>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateData: <T extends keyof IData>({
    dataKey,
    updatedData,
  }: {
    dataKey: T;
    updatedData: IData[T];
  }) => void;
}

export default function ExcelUploadModal({
  selectedKey,
  selectedFieldLabels,
  setShowModal,
  setIsLoading,
  handleUpdateData,
}: IProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const validExcelData = (rows: (string | number)[][]) => {
    const validationMessages: string[] = [];

    // 1. 데이터가 존재하는지 검사
    if (rows.length === 0) {
      return ["데이터가 없습니다."];
    }

    const labels: string[] = Object.values(selectedFieldLabels);

    const excelColumnNames = rows.shift();

    // 2. 데이터가 존재하는지 검사
    if (isUndefined(excelColumnNames)) {
      return ["데이터가 없습니다."];
    }

    // 3. 컬럼 개수가 일치하는지 검사
    if (excelColumnNames.length !== labels.length) {
      return ["컬럼 개수가 일치하지 않습니다."];
    }

    // 4. 컬럼명들이 일치하는지 검사
    const isAllValidColumnNames = excelColumnNames.every((columnName) =>
      labels.includes(columnName as string)
    );

    const isAllIncluded = labels.every((label) =>
      excelColumnNames.includes(label)
    );

    if (isAllValidColumnNames === false || isAllIncluded === false) {
      return ["컬럼 이름을 확인해주시기 바랍니다."];
    }

    // 5. 입력된 데이터 개수가 일치하지 않는 것이 있는지 검사
    rows.forEach((row, rowIndex) => {
      if (row.length !== excelColumnNames.length) {
        validationMessages.push(
          `${rowIndex + 2}행의 데이터 개수가 일치하지 않습니다.`
        );
      }
    });

    return validationMessages;
  };

  const uploadExcel = (files: File[]) => {
    setIsLoading(true);
    setErrors([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onloadstart = () => {
        console.log("reader.onloadstart");
      };

      reader.onload = async () => {
        try {
          const bstr = reader.result;
          const workbook = XLSX.read(bstr, { type: "array" });

          const workSheetName = workbook.SheetNames[0]; // 시트가 하나만 있다고 가정
          const workSheet = workbook.Sheets[workSheetName];

          const rows: string[][] = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
            blankrows: false,
          });

          const tempErrors = validExcelData(cloneDeep(rows));

          if (tempErrors.length > 0) {
            setErrors([...tempErrors]);
            return;
          }

          rows.shift();

          const keys = (() => {
            switch (selectedKey) {
              case "productList":
                return productKeys;
              case "gamecharacters":
                return gameCharacterKeys;
              case "customerOrderList":
                return customerOrderKeys;
              default:
                return customerOrderKeys;
            }
          })();

          const updatedData = rows.map((row, rowIndex) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updatedDatum = row.reduce<Record<string, any>>(
              (acc, datum, index) => {
                const key = keys[index];
                acc[key] = datum;

                return acc;
              },
              {}
            );

            updatedDatum.id = String(rowIndex);

            return updatedDatum;
          }) as IData[TKey];

          handleUpdateData({
            dataKey: selectedKey,
            updatedData,
          });

          console.log(updatedData);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          setShowModal(false);
        }
      };
    });
  };

  return (
    <>
      <Overlay onClick={() => setShowModal(false)} />
      <Modal>
        <Title>엑셀 업로드</Title>
        <Dropzone onDrop={uploadExcel} accept={accept}>
          {({
            getRootProps, // Dropzone의 **루트 요소(div)**에 필요한 속성을 추가하는 함수
            getInputProps, // 파일 업로드를 위한 input[type="file"] 요소에 속성을 추가하는 함수
            isDragAccept, // 드래그한 파일이 허용된 파일
            isDragActive, // 사용자가 파일을 드래그해서 Dropzone 위로 가져왔는지 여부
            isDragReject, // 드래그한 파일이 허용되지 않은 경우
            isFileDialogActive, // 파일 선택 창이 열려 있는지 여부
            isFocused, // Dropzone이 포커스를 받았는지 여부
            open, // input[type="file"] 클릭 없이 파일 선택 창을 열도록 강제 실행하는 함수
            acceptedFiles, // 사용자가 업로드한 파일 리스트
            fileRejections, // 업로드가 거부된 파일 리스트
          }) => {
            console.log({
              getRootProps,
              getInputProps,
              isDragAccept,
              isDragActive, // 사용자가 파일을 드래그해서 Dropzone 위로 가져왔는지 여부
              isDragReject,
              isFileDialogActive,
              isFocused,
              open,
              acceptedFiles,
              fileRejections,
            });

            return (
              <Container {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadZone>여기에 업로드해주세요.</UploadZone>
                <ErrorContainers>
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </ErrorContainers>
              </Container>
            );
          }}
        </Dropzone>
      </Modal>
    </>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const Modal = styled.div`
  width: 600px;
  height: 450px;
  background-color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  z-index: 10;
  border-radius: 20px;
  border: 2px solid black;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  height: 60px;
  border-bottom: 2px solid black;
  font-size: 16px;
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const UploadZone = styled.div`
  width: 500px;
  height: 200px;
  background-color: rgba(25, 31, 52, 0.2);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

const ErrorContainers = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 4px;

  & p {
    color: red;
    font-size: 14px;
    font-weight: 400;
  }
`;
