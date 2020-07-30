import React, {Component}  from 'react';
import {Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import { MailComposer } from 'expo';


class Contact extends Component {


    static navigationOptions = {
        title: 'Contact'
    }


    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>  
                <Card title="Contact Information" titleStyle={{fontWeight: 'bold'}}>
                    <Text style={{margin: 10}}>
                        121, Clear Water Bay Road{'\n'}
                        Clear Water Bay, Kowloon{'\n'}
                        HONG KONG{'\n'}
                        Tel: +852 1234 5678{'\n'}
                        Fax: +852 8765 4321{'\n'}
                        Email:confusion@food.net
                    </Text>
                    <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#512DA8"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                            />
                </Card>
            </Animatable.View>
        );
    }
}


export default Contact;