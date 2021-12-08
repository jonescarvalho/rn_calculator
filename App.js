import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Button from './src/components/Button';
import Display from './src/components/Display';

const App: () => Node = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  //const [displayValue, setdisplayValue] = useState('0');

  const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  };

  const [properties, setProperties] = useState(initialState);

  function setEspecificValue(key, value) {
    setProperties({
      ...properties,
      [key]: value,
    });
  }

  const addDigit = n => {
    const clearDisplay =
      properties.displayValue === '0' || properties.clearDisplay;

    if (n === '.' && !clearDisplay && properties.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : properties.displayValue;
    const displayValue = currentValue + n;
    properties.displayValue = displayValue;
    properties.clearDisplay = false;

    setEspecificValue();

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...properties.values];
      console.log('values', values);
      values[properties.current] = newValue;
      properties.values = values;
      setEspecificValue();
    }
  };

  const clearMemory = () => {
    setProperties(initialState);
  };

  const setOperation = operation => {
    if (properties.current === 0) {
      properties.operation = operation;
      properties.current = 1;
      properties.clearDisplay = true;
      setEspecificValue();
    } else {
      const equals = operation === '=';
      const values = [...properties.values];
      console.log('valor para calcular:', values);
      try {
        values[0] = eval(`${values[0]} ${properties.operation} ${values[1]}`);
      } catch (e) {
        values[0] = properties.values[0];
      }

      values[1] = 0;
      properties.displayValue = `${values[0]}`;
      properties.operation = equals ? null : operation;
      properties.current = equals ? 0 : 1;
      //properties.clearDisplay = !equals;
      properties.values = values;
      setEspecificValue();
      console.log('properties', properties);
    }
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <Display value={properties.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button double label="0" onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
    // </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <Header />
  //       <View
  //         style={{
  //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //         }}>
  //         <Section title="Step One">
  //           Edit <Text style={styles.highlight}>App.js</Text> to change this
  //           screen and then come back to see your edits.
  //         </Section>
  //         <Section title="See Your Changes">
  //           <ReloadInstructions />
  //         </Section>
  //         <Section title="Debug">
  //           <DebugInstructions />
  //         </Section>
  //         <Section title="Learn More">
  //           Read the docs to discover what to do next:
  //         </Section>
  //         <LearnMoreLinks />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
