import styled from 'styled-components';

export default styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: #fff;
  gap: 1rem;
  width: 16rem;
  height: fit-content;
  padding: 2rem;
  border-radius: 20px;
  border: 3px solid ${({ theme }) => theme.colors.main.light};
  margin-bottom: 20px;
  box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);
  -webkit-box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);
  -moz-box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);

  img {
    width: 200px;
    height: 200px;
    border-radius: 20%;
    border: 1px solid #aba9a9;
  }

  h3 {
    text-align: center;
    color: ${({ theme }) => theme.colors.main.darkLighter};
  }
`;
