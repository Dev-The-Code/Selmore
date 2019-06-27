import React, { Component } from 'react';
import './billboardDetail.css';
import {
    Form, Input, Icon, Button, message, Upload, Modal, notification, Cascader,
} from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import './billboardDetail.css';
import { HttpUtils } from '../../Services/HttpUtils';
import superagent from "superagent";
import sha1 from "sha1";
import { type } from 'os';

let id = 0;
const FormItem = Form.Item;
const option = Select.Option;
const { Option } = Select;
const country = [{
    value: 'Pakistan',
    label: 'Pakistan'
}]

class BillBoard extends Component {
    constructor() {
        super()
        this.state = {
            companyName: [],
            types: '',
            facing: '',
            fileList: [],
            imageList: [],
            previewImage: '',
            previewVisible: false,
            keyFor: [],
            noChooseFile: false,
            index: 0,
            imgArr: [],
            sumitDataAlert: false,
            company: '',
            id: '',
            compaNames: '',
            typeArr: ['Static', 'Classic', 'Digital', 'Mobile', 'Bridge',
                'Vinyl', 'Painted', 'Three Dimensional', 'Scented', 'Lamp Post'],
            facingArr: ['Front', 'Back'],
            lightningArr: ['Yes', 'No'],
            statusArr: ['Available', 'No Available'],
            audienceTypeArr: ['All types of people', 'Office type of people', 'Labour type people', 'Govt official type people'],
            citiesArr: ["Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
                " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", " Multan", " Murree", " Muridke", " Mianwali Bangla",
                " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", " Renala Khurd", " Pakpattan", " Pattoki",
                " Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", " Rabwah",
                " Raiwind", " Rajanpur", " Rahim Yar Khan", " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal",],
            statesArr: ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit', 'Azad Kashmir'],
            types: [],
            facings: [],
            lightnings: [],
            statuses: [],
            audienceTypes: [],
            cities: [],
            states: []
        }
    }

    componentDidMount() {
        this.companyNames();
        let data = this.props.data;
        console.log(data, 'data in billboard edit')
    }

    companyNames = async () => {
        let { companyName, citiesArr, typeArr, facingArr, lightningArr, statusArr, audienceTypeArr, statesArr,
            types, facings, lightnings, statuses, audienceTypes, cities, states } = this.state;
        let response = await HttpUtils.get('getcompanyname');
        // console.log(response.content, 'response')
        companyName = response.content.map((elem, i) => {
            return { label: elem.companyName, value: elem.companyName, id: elem._id }
        })
        types = typeArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        facings = facingArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        lightnings = lightningArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        statuses = statusArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        audienceTypes = audienceTypeArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        cities = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        states = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        await this.setState({
            companyName: companyName,
            types: types,
            facings: facings,
            lightnings: lightnings,
            statuses: statuses,
            audianceTypes: audienceTypes,
            cities: cities,
            states: states
        });
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChanges(index, { fileList }) {
        let fileListRef = `fileList${index}`
        this.setState({ [fileListRef]: fileList, noChooseFile: true, index: index })
    }

    deleteImage(e) {
        let { imageList } = this.state;
        imageList = imageList.filter((elem) => elem !== e)
        this.setState({ imageList: imageList })
    }

    handleChange = (data) => {
        this.setState({ company: data.value, id: data.id });
    }

    removeForm = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        // can use data-binding to set
        this.setState({ keyFor: keys.filter(key => key !== k) })
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    addForm = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        this.setState({ keyFor: keys })
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    openNotification = () => {
        notification.open({
            message: 'Form Submit',
            description:
                'Your Form has been submit If you want more than refresh the page'
        });
    };

    handleSubmit(e) {
        const { index } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({ sumitDataAlert: true });
                this.funcForUpload(values)
                this.props.form.resetFields()
            }
        });
    }

    async funcForUpload(values) {
        const { fileList, keyFor, index } = this.state;
        //merge multiple value of the field in one array
        let facing = [];
        let traffic = [];
        let longitude = [];
        let latitude = [];
        let size = [];
        let type = [];
        let width = [];
        let height = [];
        let lightning = [];
        let description = [];
        let status = [];
        let dailyRate = [];
        let weeklyRate = [];
        let monthlyRate = [];
        let yearlyRate = [];
        let audianceType = [];
        let dailyVisitor = [];
        let nearBy = [];
        let address = [];
        let city = [];
        let state = [];
        let country = [];
        for (var i = 0; i <= index; i++) {
            for (var property in values) {
                if (property.indexOf(`facing${i}`) !== -1) {
                    facing.push(values[property])
                }
                if (property.indexOf(`traffic${i}`) !== -1) {
                    traffic.push(values[property])
                }
                if (property.indexOf(`longitude${i}`) !== -1) {
                    longitude.push(values[property])
                }
                if (property.indexOf(`latitude${i}`) !== -1) {
                    latitude.push(values[property])
                }
                if (property.indexOf(`size${i}`) !== -1) {
                    size.push(values[property])
                }
                if (property.indexOf(`type${i}`) !== -1) {
                    type.push(values[property])
                }
                if (property.indexOf(`width${i}`) !== -1) {
                    width.push(values[property])
                }
                if (property.indexOf(`height${i}`) !== -1) {
                    height.push(values[property])
                } if (property.indexOf(`lightning${i}`) !== -1) {
                    lightning.push(values[property])
                } if (property.indexOf(`description${i}`) !== -1) {
                    description.push(values[property])
                } if (property.indexOf(`status${i}`) !== -1) {
                    status.push(values[property])
                } if (property.indexOf(`dailyRate${i}`) !== -1) {
                    dailyRate.push(values[property])
                } if (property.indexOf(`weeklyRate${i}`) !== -1) {
                    weeklyRate.push(values[property])
                } if (property.indexOf(`monthlyRate${i}`) !== -1) {
                    monthlyRate.push(values[property])
                } if (property.indexOf(`yearlyRate${i}`) !== -1) {
                    yearlyRate.push(values[property])
                } if (property.indexOf(`audianceType${i}`) !== -1) {
                    audianceType.push(values[property])
                } if (property.indexOf(`dailyVisitor${i}`) !== -1) {
                    dailyVisitor.push(values[property])
                } if (property.indexOf(`nearBy${i}`) !== -1) {
                    nearBy.push(values[property])
                } if (property.indexOf(`address${i}`) !== -1) {
                    address.push(values[property])
                } if (property.indexOf(`city${i}`) !== -1) {
                    city.push(values[property])
                } if (property.indexOf(`state${i}`) !== -1) {
                    state.push(values[property])
                } if (property.indexOf(`country${i}`) !== -1) {
                    country.push(values[property])
                }
            }
        }

        //store properties in object
        let obj = {};
        obj.companyName = this.state.company;
        obj.companyId = this.state.id;
        obj.facing = facing;
        obj.type = type;
        obj.size = size;
        obj.latitude = latitude;
        obj.longitude = longitude;
        obj.traffic = traffic;
        obj.width = width;
        obj.height = height;
        obj.lightning = lightning;
        obj.description = description;
        obj.status = status;
        obj.dailyRate = dailyRate;
        obj.weeklyRate = weeklyRate;
        obj.monthlyRate = monthlyRate;
        obj.yearlyRate = yearlyRate;
        obj.audianceType = audianceType;
        obj.dailyVisitor = dailyVisitor;
        obj.nearBy = nearBy;
        obj.address = address;
        obj.city = city;
        obj.state = state;
        obj.country = country;

        // console.log(obj, 'combined values')
        let arr = [];
        for (var i = 0; i <= keyFor.length; i++) {
            let fileListRef = `fileList${i}`;
            arr.push(this.state[fileListRef])
            arr = arr.filter(function (element) {
                return element !== undefined;
            });
            Promise.all(arr[i].map((val, i) => {
                return this.uploadFile(val).then((result) => {
                    return result.body.url
                })
            })).then((results) => {
                this.postData(values, results, obj)
            })
        }
    }
    //--------------function for cloudnary url ---------------
    uploadFile = (files) => {
        const image = files.originFileObj
        const cloudName = 'krlcreative'
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
        const timestamp = Date.now() / 1000
        const uploadPreset = 'ml_default'
        const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'xsor_68i83r9eBbTeZ-IF0F4p8A'
        const signature = sha1(paramsStr)
        const params = {
            'api_key': '993541634543157',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }
        return new Promise((res, rej) => {
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', image)
            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })

            uploadRequest.end((err, resp) => {
                err ? rej(err) : res(resp);
            })
        })
    }

    //-----------------cloudnary function end ------------------//

    async postData(values, response, obj) {
        //store imgs in array 
        const { imgArr } = this.state
        this.setState({
            imgArr: [...imgArr, response],

        })
        //add img array in the obj
        obj.billBoardImgs = this.state.imgArr;
        this.fectSignUpApiFunc(obj)
    }

    fectSignUpApiFunc = async (values) => {
        console.log(values, 'all arrays in one object');
        let response = await HttpUtils.post('listadd', values);
        console.log(response);
        setTimeout(() => {
            this.setState({
                sumitDataAlert: false,
            });
        }, 3000);
    }
    onChange(index, { file, fileList }) {
        if (file.status !== 'uploading') {
            let fileListRef = `fileList${index}`
            this.setState({ [fileListRef]: fileList, noChooseFile: true, index: index })
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { sumitDataAlert, companyName, previewVisible, previewImage, index,
            types, facings, lightnings, statuses, audianceTypes, cities, states } = this.state;
        { getFieldDecorator('keys', { initialValue: [keys] }) };
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div className='row'>
                    <div className='mainDive container'>
                        <div className='formDiv' key={index}>
                            {/* animation of page */}
                            <ReactCSSTransitionGroup transitionName="fade"
                                transitionAppear={true} transitionAppearTimeout={500}
                                transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                <Form.Item
                                    label={index === 0 ? 'BillBoard Detail' : ''}
                                    required={false}
                                    key={k}
                                >
                                    <div >
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label for="type"></label>
                                                <Form.Item>
                                                    <p>BillBoard Type:</p>
                                                    {getFieldDecorator(`type${index}`, {
                                                        initialValue: this.state.type,
                                                        // defaultValue: option.initialValue,
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a type',
                                                        }],
                                                    })(
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={types}
                                                        >
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label for="facing"></label>
                                                <Form.Item>
                                                    <p>Facing:</p>
                                                    {getFieldDecorator(`facing${index}`, {
                                                        initialValue: this.state.facing,
                                                        // initialValue: facing,
                                                        // defaultValue: option.initialValue,
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a facing',
                                                        }],
                                                    })(
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={facings}
                                                        >
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label for="size"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`size${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a size',
                                                            whitespace: true
                                                        }],
                                                    })(
                                                        <Input
                                                            type="text"
                                                            className={'form-control backcolor'}
                                                            id={"size"}
                                                            name="size"
                                                            placeholder="Enter billboard size"
                                                        />
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label for="latitude"></label>
                                                <Form.Item>
                                                    <br />
                                                    {getFieldDecorator(`latitude${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter latitude',
                                                            whitespace: true
                                                        },
                                                        { validator: this.validateNumber.bind(this) }]
                                                    })(
                                                        <Input
                                                            type="text"
                                                            className={'form-control '}
                                                            id="latitude"
                                                            name="latitude"
                                                            placeholder="Enter latitude"
                                                        />
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label for="longitude"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`longitude${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter longitude',
                                                            whitespace: true
                                                        },
                                                        { validator: this.validateNumber.bind(this) }]
                                                    })(
                                                        <Input
                                                            type="text"
                                                            className={'form-control '}
                                                            id="longitude"
                                                            name="longitude"
                                                            placeholder="Enter longitude"
                                                        />
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="vitalbox">
                                            <div className="row" style={{ marginTop: "10px", marginLeft: "4px" }}>
                                                <div className="col-md-4">
                                                    <FormItem
                                                        label="Images"
                                                    >
                                                        {getFieldDecorator(`images${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please upload your Images!',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <div className="clearfix">
                                                                <Upload onChange={this.onChange.bind(this, index)}>
                                                                    <Button
                                                                    >
                                                                        <Icon type="upload" /> Upload
                                                                    </Button>
                                                                </Upload>
                                                            </div>
                                                        )}
                                                    </FormItem>
                                                </div>
                                                {this.state.noChooseFile ?
                                                    null
                                                    : <div >
                                                        <h6 style={{ marginTop: "10px", marginLeft: "4px" }}> No File Chosen</h6>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label for="traffic"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`traffic${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a type',
                                                            whitespace: true
                                                        }],
                                                    })(
                                                        <Input
                                                            type="text"
                                                            className={'form-control backcolor'}
                                                            id={"traffic"}
                                                            name="traffic"
                                                            placeholder="Enter traffic count"
                                                        />
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div id='addWeiget'>
                                            <div> Billboard Road City Point Details </div>
                                            <br />
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="width"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`width${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter Width',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"width"}
                                                                name="width"
                                                                placeholder="Enter Width"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="height"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`height${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter Height',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"height"}
                                                                name="height"
                                                                placeholder="Enter Height"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="lightning"></label>
                                                    <Form.Item>
                                                        <p>Lightning:</p>
                                                        {getFieldDecorator(`lightning${index}`, {
                                                            //  initialValue: lightning,
                                                            //  defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter Lightning',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={lightnings}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="description"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`description${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter description',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"description"}
                                                                name="description"
                                                                placeholder="Enter description"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="status"></label>
                                                    <Form.Item>
                                                        <p>Status:</p>
                                                        {getFieldDecorator(`status${index}`, {
                                                            //   initialValue: status,
                                                            //   defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter status',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={statuses}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <br />
                                            <div> Military Road City Point Rate Card </div>
                                            <br />
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="dailyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`dailyRate${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter daily rate',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"dailyRate"}
                                                                name="dailyRate"
                                                                placeholder="Enter daily rate"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="weeklyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`weeklyRate${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter weekly rate',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"weeklyRate"}
                                                                name="weeklyRate"
                                                                placeholder="Enter weekly rate"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="monthlyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`monthlyRate${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter monthly rate',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"monthlyRate"}
                                                                name="monthlyRate"
                                                                placeholder="Enter monthly rate"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="yearlyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`yearlyRate${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter yearly rate',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"yearlyRate"}
                                                                name="yearlyRate"
                                                                placeholder="Enter yearly rate"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <br />
                                            <div> Military Road City Point Demographics </div>
                                            <br />
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="audianceType"></label>
                                                    <Form.Item>
                                                        <p>Audiance Type:</p>
                                                        {getFieldDecorator(`audianceType${index}`, {
                                                            //  initialValue: audianceType,
                                                            //  defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter audiance type',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={audianceTypes}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="dailyVisitor"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`dailyVisitor${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter daily visitor',
                                                                whitespace: true
                                                            },
                                                            { validator: this.validateNumber.bind(this) }]
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"dailyVisitor"}
                                                                name="dailyVisitor"
                                                                placeholder="Enter daily visitor"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="nearBy"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`nearBy${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter near By',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"nearBy"}
                                                                name="nearBy"
                                                                placeholder="Enter near By"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <br />
                                            <div> Military Road City Point Location </div>
                                            <br />
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="address"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`address${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter address',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Input
                                                                type="text"
                                                                className={'form-control backcolor'}
                                                                id={"address"}
                                                                name="address"
                                                                placeholder="Enter address"
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="city"></label>
                                                    <Form.Item>
                                                        <p>City:</p>
                                                        {getFieldDecorator(`city${index}`, {
                                                            // initialValue: cities,
                                                            // defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter city',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={cities}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="state"></label>
                                                    <Form.Item>
                                                        <p>States:</p>
                                                        {getFieldDecorator(`state${index}`, {
                                                            // initialValue: states,
                                                            //  defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter state',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={states}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Form.Item>
                                                        <p>Country:</p>
                                                        {getFieldDecorator(`country${index}`, {
                                                            // initialValue: this.state.country,
                                                            //  defaultValue: option.initialValue,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter country',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={country}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {keys.length > 1 ? (
                                        <Icon
                                            className="dynamic-delete-button btn btn-danger iconBtn fa fa-minus"
                                            onClick={() => this.removeForm(k)}
                                        />
                                    ) : null}
                                </Form.Item>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className='row'>
                <div className='mainDive container'>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="col-md-8">
                            <div className="form-group">
                                <Form.Item>
                                    <p>Company Name:</p>
                                    {getFieldDecorator('company', {
                                        initialValue: this.state.compaNames,
                                        //  defaultValue: option.initialValue,
                                        rules: [{
                                            required: true,
                                            message: 'Please enter your company name!',
                                        }],
                                    })(
                                        <Select
                                            onChange={this.handleChange}
                                            options={this.state.companyName}
                                        ></Select>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        {formItems}
                        <FormItem >
                            <Button type="dashed" onClick={this.addForm} className='btn btn-primary iconBtn'>
                                <Icon className='fa fa-plus' />
                            </Button>
                        </FormItem>
                        <div className="col-md-2 col-4">
                            <Form.Item>
                                <Button className="btn btn-primary btnapple"
                                    type="primary" htmlType="submit"
                                    data-toggle="modal" data-target="#biilbord"
                                >Submit</Button>
                                <br />
                                <br />
                                {sumitDataAlert ?
                                    <div class="alert alert-success" role="alert">
                                        <strong>Data Has Been Submitted </strong>

                                    </div>
                                    :
                                    null
                                }
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedDynamicFieldSet = Form.create()(BillBoard);
export default WrappedDynamicFieldSet;
