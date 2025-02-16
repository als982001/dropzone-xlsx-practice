import { Dispatch, SetStateAction, useState } from "react";
import Dropzone, { Accept } from "react-dropzone";
import styled from "styled-components";

const accept: Accept = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xls",
    ".xlsx",
  ],
};

interface IProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ExcelUploadModal({ setShowModal }: IProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const uploadExcel = () => {
    console.log("uploadExcel");
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
