import React, { Component }  from 'react';
import { View } from 'react-native';
import { InputGroup, Input, Label, Item, Icon, Button }  from 'native-base';
import { observer } from "mobx-react";

@observer
class CustomListInputText extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { store, index } = this.props
        return (
            <View>
                {store.items.map((value, key) => (
                    <Item stackedLabel key={key}>
                        <Label>{key}.</Label>
                        <InputGroup>
                        <Icon name='paper' style={{color:'#00C497'}}/>
                        <Input
                            placeholder='Text'
                            value={value}
                            onChangeText={(text) => store.setItem(key, text)}
                        />
                        <Button rounded danger onPress={() => store.removeItem(key)} disabled={store.items.length<=2}>
                            <Icon name='md-remove' />
                        </Button>
                        </InputGroup>
                    </Item>
                ))}
            </View>
        );
    }
}


export default CustomListInputText