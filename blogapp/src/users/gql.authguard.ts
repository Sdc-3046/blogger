import { Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common"

@Injectable()
export class GQLAuthGuard extends AuthGuard('jwt'){

    constructor(){
        super();
    }

    getRequest(context : ExecutionContext){
        
        const ctx=GqlExecutionContext.create(context);

        return ctx.getContext().req; 
    }
}