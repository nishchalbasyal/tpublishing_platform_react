import styled from "styled-components"

//Write Your HTML & CSS Here
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

 
`;

//Your CSS
const Container = styled.div`
  text-align: center;
`

const styledComponentDemo = () => {
  return (

    //Your Code
    <Container>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
    </Container>

    //Your Code
  )
}

export default styledComponentDemo
