import React, { Component } from 'react';
import './billboardDetail.css';
import {
    Form, Input, Icon, Button, Upload, Modal, notification, Cascader,
} from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import './billboardDetail.css';
import { HttpUtils } from '../../Services/HttpUtils';
import superagent from "superagent";
import sha1 from "sha1";

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
            compaNames: '',
            type: '',
            category: '',
            facing: '',
            lightning: '',
            status: "",
            audianceType: '',
            city: '',
            state: '',
            country: '',
            size: '',
            latitude: '',
            longitude: '',
            traffic: '',
            width: '',
            height: '',
            description: '',
            dailyRate: '',
            weeklyRate: '',
            monthlyRate: '',
            yearlyRate: '',
            dailyVisitor: '',
            nearBy: '',
            address: '',
            objectId: '',
            fileList: [],
            imageList: [],
            previewImage: '',
            previewVisible: false,
            keyFor: [],
            noChooseFile: false,
            index: 0,
            imgArr: [],
            sumitDataAlert: false,
            id: '',
            companyName: [],
            typeArr: ['Static', 'Classic', 'Digital', 'Mobile', 'Bridge',
                'Vinyl', 'Painted', 'Three Dimensional', 'Scented', 'Lamp Post'],
            categoryArr: ['Billboard ' , 'Taxi Ads' , 'Bus Ads' , 'Bus Shelter Ads' , 'Airport Ads' , 'Shopping Mall' ,
                'Total Cinima Ads' , 'Radio Ads' , 'Other'],
            facingArr: ['Front', 'Back'],
            lightningArr: ['Yes', 'No'],
            statusArr: ['Available', 'No Available'],
            audienceTypeArr: ['All types of people', 'Office type of people', 'Labour type people', 'Govt official type people'],
            citiesArr: ["Abbottabad", "Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad", "Hyderabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
                " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", " Multan", " Murree", " Muridke", " Mianwali Bangla",
                " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Renala Khurd", " Pakpattan", " Pattoki",
                " Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Rabwah",
                " Raiwind", " Rajanpur", " Rahim Yar Khan", " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal",],
            statesArr: ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit', 'Azad Kashmir'],
            types: [],
            categories:[],
            facings: [],
            lightnings: [],
            statuses: [],
            audienceTypes: [],
            cities: [],
            states: []
        }
    }

    async componentDidMount() {
        this.gettingDropDownValues();
    }
    async componentWillMount() {
        let data = this.props.data;
        // console.log(data, 'data')
        await this.editDataShowns(data)
    }
    gettingDropDownValues = async () => {
        let { companyName, citiesArr, typeArr, categoryArr, facingArr, lightningArr, statusArr, audienceTypeArr, statesArr,
            types, categories, facings, lightnings, statuses, audienceTypes, cities, states } = this.state;
        let response = await HttpUtils.get('getcompanyname');
        companyName = response.content.map((elem, i) => {
            return { label: elem.companyName, value: elem.companyName, id: elem._id }
        })
        types = typeArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        categories = categoryArr.map((elem, i) => {
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
            categories: categories,
            facings: facings,
            lightnings: lightnings,
            statuses: statuses,
            audianceTypes: audienceTypes,
            cities: cities,
            states: states
        });
    }
    editDataShowns = async (data) => {
        // console.log(data, 'data')
        if (data != undefined) {
            await this.setState({
                compaNames: data.companyName,
                type: data.type,
                category: data.category,
                facing: data.facing,
                lightning: data.lightning,
                status: data.status,
                audianceType: data.audianceType,
                city: data.city,
                state: data.state,
                country: data.country,
                size: data.size,
                latitude: data.latitude,
                longitude: data.longitude,
                traffic: data.traffic,
                width: data.width,
                height: data.height,
                description: data.description,
                dailyRate: data.dailyRate,
                weeklyRate: data.weeklyRate,
                monthlyRate: data.monthlyRate,
                yearlyRate: data.yearlyRate,
                dailyVisitor: data.dailyVisitor,
                nearBy: data.nearBy,
                address: data.address,
                objectId: data._id
            })
        }
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
        console.log(data.value)
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
        const { index } = this.state;
        console.log(values)
        let arr = [];
        for (var i = 0; i <= index; i++) {
            let multipleBillbordObj = `billbordObj${i}`;
            multipleBillbordObj = {}
            for (var property in values) {

                //seprate the billboard form data in user fill multiple form in one time
                if (property == `traffic${i}`) {
                    multipleBillbordObj.traffic = values[property]
                }
                if (property == `category${i}`) {
                    multipleBillbordObj.category = values[property].value
                }
                if (property == `facing${i}`) {
                    multipleBillbordObj.facing = values[property].value
                }
                if (property == `longitude${i}`) {
                    multipleBillbordObj.longitude = values[property]
                }
                if (property == `latitude${i}`) {
                    multipleBillbordObj.latitude = values[property]
                }
                if (property == `size${i}`) {
                    multipleBillbordObj.size = values[property]
                }
                if (property == `type${i}`) {
                    multipleBillbordObj.type = values[property].value
                }
                if (property == `width${i}`) {
                    multipleBillbordObj.width = values[property]
                }
                if (property == `height${i}`) {
                    multipleBillbordObj.height = values[property]
                }
                if (property == `lightning${i}`) {
                    multipleBillbordObj.lightning = values[property].value
                }
                if (property == `description${i}`) {
                    multipleBillbordObj.description = values[property]
                }
                if (property == `status${i}`) {
                    multipleBillbordObj.status = values[property].value
                }
                if (property == `dailyRate${i}`) {
                    multipleBillbordObj.dailyRate = values[property]
                }
                if (property == `weeklyRate${i}`) {
                    multipleBillbordObj.weeklyRate = values[property]
                }
                if (property == `monthlyRate${i}`) {
                    multipleBillbordObj.monthlyRate = values[property]
                }
                if (property == `yearlyRate${i}`) {
                    multipleBillbordObj.yearlyRate = values[property]
                }
                if (property == `audianceType${i}`) {
                    multipleBillbordObj.audianceType = values[property].value
                }
                if (property == `dailyVisitor${i}`) {
                    multipleBillbordObj.dailyVisitor = values[property]
                }
                if (property == `nearBy${i}`) {
                    multipleBillbordObj.nearBy = values[property]
                }
                if (property == `address${i}`) {
                    multipleBillbordObj.address = values[property]
                }
                if (property == `city${i}`) {
                    multipleBillbordObj.city = values[property].value
                }
                if (property == `state${i}`) {
                    multipleBillbordObj.state = values[property].value
                }
                if (property == `country${i}`) {
                    multipleBillbordObj.country = values[property].value
                }
                if (property == 'company') {
                    multipleBillbordObj.companyName = values[property].value
                    multipleBillbordObj.companyId = values[property].id
                }
                if (property == `images${i}`) {
                    multipleBillbordObj.images = values[property]
                }

            }
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
                multipleBillbordObj.images = results
                this.postData(results, multipleBillbordObj)
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

    async postData(response, obj) {
        //store imgs in array 
        console.log(response)
        // let img = response
        // this.setState({
        //     imgArr: [...imgArr, response],
        // }, () => { obj.images = this.state.imgArr })
        // console.log(imgArr)
        //add img array in the obj
        console.log(obj)
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
        const { sumitDataAlert,
            companyName, types, categories, facings, lightnings, statuses, audianceTypes, cities, states } = this.state;
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
                                    style={{ textAlign: 'left' }}
                                    required={false}
                                    key={k}
                                >
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="type"></label>
                                                <Form.Item>
                                                    <p>BillBoard Type:</p>
                                                    {getFieldDecorator(`type${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a type',
                                                        }],
                                                    })(
                                                        <Select
                                                            // placeholder = 'Type'
                                                            onChange={this.handleChange}
                                                            options={types}
                                                            defaultValue={{ label: this.state.type, value: this.state.type }}
                                                        >
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="category"></label>
                                                <Form.Item>
                                                    <p>Category:</p>
                                                    {getFieldDecorator(`category${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a category',
                                                        }],
                                                    })(
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={categories}
                                                            defaultValue={{ label: this.state.category, value: this.state.category }}
                                                        >
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="facing"></label>
                                                <Form.Item>
                                                    <p>Facing:</p>
                                                    {getFieldDecorator(`facing${index}`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please enter a facing',
                                                        }],
                                                    })(
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={facings}
                                                            defaultValue={{ label: this.state.facing, value: this.state.facing }}
                                                        >
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="size"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`size${index}`, {
                                                        initialValue: this.state.size,
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

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="latitude"></label>
                                                <Form.Item>
                                                    <br />
                                                    {getFieldDecorator(`latitude${index}`, {
                                                        initialValue: this.state.latitude,
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

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="longitude"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`longitude${index}`, {
                                                        initialValue: this.state.longitude,
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
                                        <div className="col-md-4"></div>


                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="vitalbox">
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                                        <FormItem
                                                            label="Images"
                                                        >
                                                            {getFieldDecorator(`images${index}`, {
                                                                initialValue: this.state.imgArr,
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
                                                            <h6 style={{ marginTop: "10px", }}>&nbsp;&nbsp; No File Chosen</h6>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <br />

                                        <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                                            <div className="form-group">
                                                <label for="traffic"></label>
                                                <Form.Item>
                                                    {getFieldDecorator(`traffic${index}`, {
                                                        initialValue: this.state.traffic,
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
                                    </div>

                                    <div id='addWeiget'>
                                        <div> Billboard Road City Point Details </div>

                                        <br />

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="width"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`width${index}`, {
                                                            initialValue: this.state.width,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="height"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`height${index}`, {
                                                            initialValue: this.state.height,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="lightning"></label>
                                                    <Form.Item>
                                                        <p>Lightning:</p>
                                                        {getFieldDecorator(`lightning${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter Lightning',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={lightnings}
                                                                defaultValue={{ label: this.state.lightning, value: this.state.lightning }}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="description"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`description${index}`, {
                                                            initialValue: this.state.description,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="status"></label>
                                                    <Form.Item>
                                                        <p>Status:</p>
                                                        {getFieldDecorator(`status${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter status',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={statuses}
                                                                defaultValue={{ label: this.state.status, value: this.state.status }}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <br />

                                        <div> Military Road City Point Rate Card </div>

                                        <br />

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="dailyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`dailyRate${index}`, {
                                                            initialValue: this.state.dailyRate,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="weeklyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`weeklyRate${index}`, {
                                                            initialValue: this.state.weeklyRate,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="monthlyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`monthlyRate${index}`, {
                                                            initialValue: this.state.monthlyRate,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="yearlyRate"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`yearlyRate${index}`, {
                                                            initialValue: this.state.yearlyRate,
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
                                        </div>

                                        <br />

                                        <div> Military Road City Point Demographics </div>

                                        <br />

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="audianceType"></label>
                                                    <Form.Item>
                                                        <p>Audiance Type:</p>
                                                        {getFieldDecorator(`audianceType${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter audiance type',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={audianceTypes}
                                                                defaultValue={{ label: this.state.audianceType, value: this.state.audianceType }}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="dailyVisitor"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`dailyVisitor${index}`, {
                                                            initialValue: this.state.dailyVisitor,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="nearBy"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`nearBy${index}`, {
                                                            initialValue: this.state.nearBy,
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
                                        </div>

                                        <br />

                                        <div> Military Road City Point Location </div>

                                        <br />

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="address"></label>
                                                    <Form.Item>
                                                        {getFieldDecorator(`address${index}`, {
                                                            initialValue: this.state.address,
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
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="city"></label>
                                                    <Form.Item>
                                                        <p>City:</p>
                                                        {getFieldDecorator(`city${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter city',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={cities}
                                                                defaultValue={{ label: this.state.city, value: this.state.city }}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label for="state"></label>
                                                    <Form.Item>
                                                        <p>States:</p>
                                                        {getFieldDecorator(`state${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter state',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={states}
                                                                defaultValue={{ label: this.state.state, value: this.state.state }}
                                                            >
                                                            </Select>
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <Form.Item>
                                                        <p>Country:</p>
                                                        {getFieldDecorator(`country${index}`, {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please enter country',
                                                            }],
                                                        })(
                                                            <Select
                                                                onChange={this.handleChange}
                                                                options={country}
                                                                defaultValue={{ label: this.state.country, value: this.state.country }}
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
                        <div className="col-md-8 col-xl-8">
                            <div className="form-group">
                                <Form.Item className="list_form">
                                    <p style={{ fontWeight: 'bold' }}>Company Name:</p>
                                    {getFieldDecorator('company', {
                                        rules: [{
                                            required: true,
                                            message: 'Please enter your company name!',
                                        }],
                                    })(
                                        <Select
                                            onChange={this.handleChange}
                                            options={companyName}
                                            style={{ textAlign: 'left' }}
                                            defaultValue={{ label: this.state.compaNames, value: this.state.compaNames }}
                                            Select-placeholder="Country"
                                        ></Select>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        {formItems}

                        <div className="col-md-1">
                            <FormItem >
                                <Button type="dashed" onClick={this.addForm} className='btn btn-primary iconBtn'>
                                    <Icon className='fa fa-plus' />
                                </Button>
                            </FormItem>
                        </div>
                        <div className="col-md-11"></div>



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

                        <div className="row">
                            <div className="col-md-8 col-xl-8 d-none d-sm-block">
                                <div className="form-group" style={{ width: '97%' }}>
                                    <Form.Item className="list_form" style={{ marginLeft: '1%' }}>
                                        <p style={{ fontWeight: 'bold' }}>Company Name:</p>
                                        {getFieldDecorator('company', {
                                            rules: [{
                                                required: true,
                                                message: 'Please enter your company name!',
                                            }],
                                        })(
                                            <Select
                                                onChange={this.handleChange}
                                                options={companyName}
                                                style={{ textAlign: 'left' }}
                                                defaultValue={{ label: this.state.compaNames, value: this.state.compaNames }}
                                                Select-placeholder="Country"
                                            ></Select>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="col-12 d-block d-sm-none">
                                <div className="form-group">
                                    <Form.Item className="list_form" style={{ marginLeft: '1%' }}>
                                        <p style={{ fontWeight: 'bold' }}>Company Name:</p>
                                        {getFieldDecorator('company', {
                                            rules: [{
                                                required: true,
                                                message: 'Please enter your company name!',
                                            }],
                                        })(
                                            <Select
                                                onChange={this.handleChange}
                                                options={companyName}
                                                style={{ textAlign: 'left' }}
                                                defaultValue={{ label: this.state.compaNames, value: this.state.compaNames }}
                                                Select-placeholder="Country"
                                            ></Select>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        {formItems}

                        <div className="col-xl-1 col-lg col-md-1 d-none d-sm-block" style={{ marginLeft: '0.5%' }}>
                            <div className="row">
                                <FormItem>
                                    <Button type="dashed" onClick={this.addForm} className='btn btn-primary iconBtn'>
                                        <Icon className='fa fa-plus' />
                                    </Button>
                                </FormItem>
                            </div>
                        </div>
                        <div className="col-1 d-block d-sm-none" style={{ marginLeft: '1.5%' }}>
                            <div className="row">
                                <FormItem>
                                    <Button type="dashed" onClick={this.addForm} className='btn btn-primary iconBtn'>
                                        <Icon className='fa fa-plus' />
                                    </Button>
                                </FormItem>
                            </div>
                        </div>
                        <div className="col-md-11"></div>



                        <div className="col-xl-2 col-lg-2 col-md-2 d-none d-sm-block" style={{ marginLeft: '0.5%' }}>
                            <div className="row">
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
                        </div>

                        <div className="col-4 d-block d-sm-none" style={{ marginLeft: '1%' }}>
                            <div className="row">
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
                        </div>

                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedDynamicFieldSet = Form.create()(BillBoard);
export default WrappedDynamicFieldSet;
