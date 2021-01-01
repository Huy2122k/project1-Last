const with4Slices = (data) => {
    const withResources = [];
    if(data.hasOwnProperty("res") && data.res.s) {
        data.res.s.array.foreach((element, index) => {
            if(element.r && (
                (type.typeName == 'Tài liệu nội bộ' && element['uni-id'] == uni_id && element.private)
                || (type.typeName == 'Tài liệu nội bộ trường khác' && element['uni-id'] != uni_id && element.private)
                || (!element.private && type.typeName == 'Internet'))){
                    const obj ={
                        quantity : parseInt(element.r*100)/100  ,
                        percentage : parseInt(element.r*100)/100 ,
                        name : element.n.replace("txt", "pdf"),
                        id : index
                    };
                        withResources.push(obj);              
                }
            }
        );
    }
    return withResources;
}



// const with4Slices = (data) => [
//     {
//         quantity: 60,
//         percentage: 60,
//         name: 'React',
//         id: 1,
//     },
//     {
//         quantity: 20,
//         percentage: 20,
//         name: 'Ember',
//         id: 2,
//     },
//     {
//         quantity: 10,
//         percentage: 10,
//         name: 'Angular',
//         id: 3,
//     },
//     {
//         quantity: 10,
//         percentage: 10,
//         name: 'Backbone',
//         id: 4,
//     },
// ];

export default {
    with4Slices,
};
