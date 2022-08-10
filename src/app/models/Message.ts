export class Message{
    user_id!:number | null;
    user_type!:string | null;
    message!:string | null;
    topic!:string[];
    type!:string | null;
    button_id!:number | null;
    time_stamp!:Date | null;
    is_connection_lose!:boolean;
    is_ShowDay!:boolean;
    is_loading!:boolean;
}

export class SendMessage{
    UserId!:number | null;
    UserType!:string | null;
    Message!:string;
    Topic!:string[];
    Type!:string;
    IsPressTopic!:boolean;
    TimeStamp!:Date;
    TimeStampString!:string;
}

export class RecieveMessage{
    userId!:number | null;
    userType!:string | null;
    isFirstLoad!:boolean;
    lists!:RecieveMessageDetails[];
}

export class RecieveMessageDetails{
    message!:string | null;
    buttonId!:number | null;
    topic!:string[];
    timeStamp!:Date | null;
    type!:string | null;
    userType!:string | null;
}