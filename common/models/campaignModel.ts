interface CampaignModel{
    _id:string;
    initial_date:Date;
    end_date:Date;
    benefit:string;
    validity_days:number;
    winpoints:[
        {
            event:string,
            points:string
        }
    ]

}

export default CampaignModel;