import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ApplyStatus'})
export class ApplyStatusPipe implements PipeTransform {
    transform(value: number): String {
        let status = {
            1: '审核中',
            2: '审核未通过',
            3: '审核通过',
            4: '办理成功',
            5: '办理失败'
        };
        return status[value];
    }
}