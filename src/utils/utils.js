import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data,callback){
        return {
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            onChange:(current)=>{
                callback(current)
            },
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },

    //遍历Option
    getOptionList(data){
        if(!data){
            return '';
        }

        let options=[];

        data.map((item)=>{
            item.key=item.id
            var option = <Option value={item.id} key={item.id}>{item.name}</Option>
            options.push(option);
        })

        return options;
    }
}