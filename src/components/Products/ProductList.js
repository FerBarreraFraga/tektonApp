import React from 'react';
import { ActivityIndicator, View, Text, TouchableWithoutFeedback, StyleSheet, Image, FlatList, SectionList, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import {
    getProducts
} from '../../actions';

import {
    mOrange, mGrey, sLightGrey
} from 'styles/Styles';

import search from '../../../assets/img/common/search.png';

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }

    changeSearch = (searchText) => {
        this.setState({ searchText })
    }

    goBack = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Leads' }]
        })
        this.props.changeLeadFilter();
        this.props.changeLeadCategory();
    }

    getFilterData = () => {
        const { leadsCategoryFilter, leadsData } = this.props;
        const { searchText } = this.state;
        if (leadsData && leadsData.length) {
            let data = leadsData;

            if (leadsCategoryFilter) {
                data = leadsData.filter(item => {
                    return item.attributes.status == leadsCategoryFilter
                })
            }

            if (searchText) {
                let filterData = null;
                let dataList = data ? data : leadsData;

                filterData = dataList.filter(item => {
                    let { attributes } = item;
                    let fullName =
                        `${attributes.first_name.toLowerCase()} ${attributes.last_name && attributes.last_name.toLowerCase()}`;
                    if (fullName.includes(searchText.toLowerCase())) {
                        return item
                    }
                });

                data = filterData;
            }

            var groups = {};
            data.sort(function (a, b) {
                if (a.attributes.first_name.toLowerCase() < b.attributes.first_name.toLowerCase()) { return -1; }
                if (a.attributes.first_name.toLowerCase() > b.attributes.first_name.toLowerCase()) { return 1; }
                return 0;
            })

            data.forEach(function (item) {
                const initial = item.attributes.first_name.charAt(0).toUpperCase();
                if (!groups[initial]) {
                    groups[initial] = [];
                }
                groups[initial].push(item);
            });

            return Object.keys(groups).map((initial) => {
                return {
                    initial,
                    data: groups[initial]
                };
            });
        }

        return [];
    }

    selectContact = (contact) => {
        this.props.selectContact(contact);
        this.props.navigation.navigate("ShowLead")
    }

    getLeadsList = () => {
        return (
            <SectionList
                ref={(ref) => {
                    this.ListView_Ref = ref;
                }}
                initialNumToRender={50}
                keyExtractor={(item, index) => index}
                keyboardShouldPersistTaps="always"
                sections={this.getFilterData()}
                stickySectionHeadersEnabled="true"
                renderItem={this.renderItem}
                renderSectionHeader={({ section }) =>
                    <View style={{ backgroundColor: sLightGrey, borderRadius: 20, marginBottom: 10, }}>
                        <Text style={{ marginLeft: 10 }}>
                            {section.initial}
                        </Text>
                    </View>
                }
            />
        )
    }

    renderItem = ({ item }) => {
        return <Text>ESTE ES UN ITEM</Text>
    }

    render() {
        const { productLoading } = this.props;
        const { searchText } = this.state;

        return (
            <View style={styles.screen}>
                <View style={{ marginHorizontal: 20, flex: 1 }}>
                    <View style={[
                        styles.passwordSectionStyle, { borderWidth: 0.7, borderColor: mGrey }]}>
                        <TextInput
                            ref={this.inputRef}
                            autoCapitalize="none"
                            autoCorrect={false}
                            label={'Search'}
                            onChangeText={this.changeSearch}
                            style={styles.textInput}
                            theme={{ colors: { primary: mOrange } }}
                            underlineColor="transparent"
                            value={searchText}
                        />

                        <Image
                            source={search}
                            style={[styles.imageStyle, { marginRight: 10 }]}
                        />
                    </View>

                    {productLoading &&
                        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating={true} size={100} color="#DF703D" />
                        </View>
                    }
                    {!productLoading && this.getLeadsList()}
                </View>
            </View>
        )
    }
}



function mapStateToProps({ products }) {

    
    return {
    };
}

export default connect(mapStateToProps, {
    getProducts
})(Category);


const styles = StyleSheet.create({
    imageStyle: {
        alignItems: 'center',
        height: 20,
        width: 20,
    },

    passwordSectionStyle: {
        alignItems: 'center',
        backgroundColor: '#F3F2F7',
        borderColor: 'red',
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 25
    },

    screen: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 40,
    },

    textInput: {
        backgroundColor: '#F3F2F7',
        borderRadius: 5,
        borderWidth: 0,
        color: '#000',
        flex: 1,
        fontSize: 16,
        height: 50,
        paddingLeft: 10,
    },

    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
});