export class CreateSchemaDto {
}

export class DeleteSchemaDto {
}

export class dto {
    name:String
    age: String
    address: String
    gender: String
    dateofBirth: String
}


export const createScheme = (data: dto)=> {
    let obj = {}
    let arr = Object.entries(data)
    arr.forEach((val)=>{
        obj[val[0]] = eval(val[1])
    })
    return obj
}

export const getTypeSchema = (data) => {
    let obj = {}
    let arr = Object.entries(data)
    arr.forEach((val)=>{
        obj[val[0]] = typeof val[1]
    })
    return obj
}
