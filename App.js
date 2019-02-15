import React from 'react';
import { Container, Header, Left, Body, Right, Title, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail, Form, Label, View } from 'native-base';


class App extends React.Component {

  state = {
    // kenapa ada massaInput dan tinggiInput supaya saat user ganti value di input, ga langsung keganti tulisan Massa dan Tinggi di hasil bawahnya.
    massaInput: 0,
    tinggiInput: 0,
    massa: "",
    tinggi: "",
    indeksMassaTubuh: "",
    diagnosa: ""
  }

  hitungIMT = () => {

    if (this.state.massaInput == 0 || this.state.massaInput == "") {
      alert("Massa harus diisi");
    }
    else if (this.state.tinggiInput == 0 || this.state.tinggiInput == "") {
      alert("Tinggi harus diisi!");
    }
    else {

      var indeksMassaTubuhTemp = this.state.massaInput / (Math.pow(this.state.tinggiInput, 2)); //IMT = massa * tinggi^2

      var diagnosaTemp = "";

      switch (true) {
        case (indeksMassaTubuhTemp < 18.5):
          diagnosaTemp = "Berat badan kurang!";
          break;

        case (indeksMassaTubuhTemp >= 18.5 && indeksMassaTubuhTemp < 25):
          diagnosaTemp = "Berat badan ideal!";
          break;

        case (indeksMassaTubuhTemp >= 25 && indeksMassaTubuhTemp < 30):
          diagnosaTemp = "Berat badan berlebih!";
          break;

        case (indeksMassaTubuhTemp >= 30 && indeksMassaTubuhTemp < 40):
          diagnosaTemp = "Berat badan sangat berlebih!";
          break;

        case (indeksMassaTubuhTemp >= 40):
          diagnosaTemp = "Berat badan obesitas!";
          break;

        default: break;

      }

      this.setState({
        massa: this.state.massaInput,
        tinggi: this.state.tinggiInput,
        indeksMassaTubuh: indeksMassaTubuhTemp,
        diagnosa: diagnosaTemp
      });

    }


  }

  displayResult() {
    return (
      <React.Fragment>
        <View style={{ flexDirection: "column", alignItems: "center", marginTop: 50 }}>
          <Left />
          <Body>
            <Text style={{ fontSize: 20 }}>
              Massa tubuh:
      </Text>

            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {this.state.massa} kg
      </Text>

            <Text style={{ fontSize: 20 }}>
              Tinggi badan:
      </Text>

            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {this.state.tinggi.toFixed(2)} m
      </Text>

            <Text style={{ fontSize: 20 }}>
              Indeks massa tubuh:
      </Text>

            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {this.state.indeksMassaTubuh}
            </Text>

            <Text style={{ fontSize: 20 }}>
              Diagnosa:
      </Text>

            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {this.state.diagnosa}
            </Text>
          </Body>


        </View>


      </React.Fragment>
    )
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>INDEKS MASSA TUBUH</Title>
          </Body>
        </Header>

        <Form style={{ flexDirection: "row" }}>

          <Item floatingLabel style={{ flex: 1 }}>
            <Label><Text>Massa (kg)</Text></Label>
            <Input onChangeText={(e) => {
              this.setState({ massaInput: e });
            }}></Input>
          </Item>

          <Item floatingLabel style={{ flex: 1 }}>
            <Label><Text>Tinggi (cm)</Text></Label>
            <Input onChangeText={(e) => {
              this.setState({ tinggiInput: parseInt(e) / 100 }); //dijadikan meter
            }}></Input>
          </Item>

        </Form>

        <Button full style={{ marginTop: 50 }} onPress={this.hitungIMT}>
          <Text>HITUNG IMT</Text>
        </Button>

        {(this.state.diagnosa && this.state.indeksMassaTubuh) ? this.displayResult() : <Text></Text>}

      </Container>

    )
  }
}

export default App;
