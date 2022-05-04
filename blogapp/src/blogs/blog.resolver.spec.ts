import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { BlogResolver } from "./blog.resolver";
import { BlogService } from "./blog.service";

describe('UserResolver', ()=>{
    
    let resolver:BlogResolver;
    const id="40bfe2b2-152b-4dff-ae24-2f89b4a1e4a6";
    const rating=4;
    const blog={
        id:expect.any(String),
        blogTitle:expect.any(String),
        blogContent:expect.any(String),
        blogDate:expect.any(Date),
        blogTags:expect.any(String),
        blogAuthor:expect.any(String),
        userId:expect.any(String)
    }
    const comment={
        id: expect.any(String),
        
        userName: expect.any(String),
    
        userComment: expect.any(String),
        
        blogId: expect.any(String),
    }

    const userId="e0696ab1-aff5-4f92-a737-8e739fee00a7";
    const searchText='work'
    const mockBlogService={
        getBlogById: jest.fn(filter=>{
            return {
                blog
            }
        }),

        searchBlogs: jest.fn(searchText =>{
            return {
                blog
            }
        }),

        addBlogRating: jest.fn(dto =>{
            return{ 
                blog
            }
        }),

        getMyBlogs: jest.fn(userId=>{
            return {
                blog
            }
        }),

        getComments:jest.fn(id=>{
            return {
                comment
            }
        })
    }
    

    beforeEach(async ()=>{
        

        const module:TestingModule=await Test.createTestingModule({
            providers:[BlogService,BlogResolver],

        }).overrideProvider(BlogService).useValue(mockBlogService).compile()
        
        resolver=module.get<BlogResolver>(BlogResolver);
    });

    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    })

    it('get a blog by id', ()=>{
        expect(resolver.getBlogById(id)).toEqual({
            blog
        })
    }),

    it('should get bloglist on search text', ()=>{
        expect(resolver.searchBlogs(searchText)).toEqual({
            blog
        })
    }),

    it('should get bloglist on search text', ()=>{
        expect(resolver.addBlogRating(rating,id)).toEqual({
            blog
        })
    }),

    it('should return blogs of logged in user',()=>{
        expect(resolver.getMyBlogs(userId)).toEqual({
            blog
        })
    }),

    it('should get comments of blog',()=>{
        expect(resolver.getComments(id)).toEqual({comment})
    })

    
    
});
