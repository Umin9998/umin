import { styled } from "styled-components";

const NavigatePage = ({
  currentPageNumber,
  applicationListTotalCount,
  handlePageChange,
}: any) => {
  const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 58px;
  `;
  return (
    <Pagination>
      <div onChange={handlePageChange}>"‹""›"</div>
    </Pagination>
  );
};

export default NavigatePage;
