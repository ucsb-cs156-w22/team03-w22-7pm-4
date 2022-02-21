package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.CollegiateSubreddit;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.CollegiateSubredditRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = CollegiateSubredditController.class)
@Import(TestConfig.class)
public class CollegiateSubredditControllerTests extends ControllerTestCase {

    @MockBean
    CollegiateSubredditRepository collegiateSubredditRepository;

    @MockBean
    UserRepository userRepository;
     // Authorization tests for /api/collegiateSubreddits/all

     @Test
     public void api_todos_all__logged_out__returns_403() throws Exception {
         mockMvc.perform(get("/api/collegiateSubreddits/all"))
                 .andExpect(status().is(403));
     }
 
     @WithMockUser(roles = { "USER" })
     @Test
     public void api_todos_all__user_logged_in__returns_200() throws Exception {
         mockMvc.perform(get("/api/collegiateSubreddits/all"))
                 .andExpect(status().isOk());
     }

     // Authorization tests for /api/collegiateSubreddits/post

    @Test
    public void api_todos_post__logged_out__returns_403() throws Exception {
        mockMvc.perform(post("/api/collegiateSubreddits/post"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_collegiateSubreddits_post__user_logged_in() throws Exception {
        // arrange

        //User u = currentUserService.getCurrentUser().getUser();

        CollegiateSubreddit expectedCollegiateSubreddit = CollegiateSubreddit.builder()
                .name("Test Name")
                .location("Test Location")
                .subreddit("Test Subreddit")
                //.done(true)
                //.user(u)
                .id(0L)
                .build();

        when(collegiateSubredditRepository.save(eq(expectedCollegiateSubreddit))).thenReturn(expectedCollegiateSubreddit);

        // act
        MvcResult response = mockMvc.perform(
                post("/api/collegiateSubreddits/post?name=Test Name&location=Test Location&subreddit=Test Subreddit")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).save(expectedCollegiateSubreddit);
        String expectedJson = mapper.writeValueAsString(expectedCollegiateSubreddit);
        //System.out.println("This is the expectedJson:" + expectedJson);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_user_all__user_logged_in__returns_all_subreddits() throws Exception {

        // arrange

        CollegiateSubreddit cs1 = CollegiateSubreddit.builder().name("Name 1").location("location 1").subreddit("subreddit 1").build();
        CollegiateSubreddit cs2 = CollegiateSubreddit.builder().name("Name 2").location("location 2").subreddit("subreddit 2").build();
        CollegiateSubreddit cs3 = CollegiateSubreddit.builder().name("Name 3").location("location 3").subreddit("subreddit 3").build();

        ArrayList<CollegiateSubreddit> expectedCollegiateSubreddit = new ArrayList<>();
        expectedCollegiateSubreddit.addAll(Arrays.asList(cs1, cs2, cs3));

        when(collegiateSubredditRepository.findAll()).thenReturn(expectedCollegiateSubreddit);

        // act
        MvcResult response = mockMvc.perform(get("/api/collegiateSubreddits/all"))
                .andExpect(status().isOk()).andReturn();

        // assert

        verify(collegiateSubredditRepository, times(1)).findAll();
        String expectedJson = mapper.writeValueAsString(expectedCollegiateSubreddit);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api__user_logged_in__search_for_collegiateSubreddit_that_does_not_exist() throws Exception {

        // arrange

        //User u = currentUserService.getCurrentUser().getUser();

        when(collegiateSubredditRepository.findById(eq(7L))).thenReturn(Optional.empty());
        // act
        MvcResult response = mockMvc.perform(get("/api/collegiateSubreddits?id=7"))
                .andExpect(status().isBadRequest()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).findById(eq(7L));
        String responseString = response.getResponse().getContentAsString();
        assertEquals("CollegiateSubreddit with id 7 not found", responseString);
    } 
    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api__user_logged_in__returns_a_collegiateSubreddit_that_exists() throws Exception {

        // arrange

        //User u = currentUserService.getCurrentUser().getUser();
        CollegiateSubreddit todo1 = CollegiateSubreddit.builder().name("Name 1").location("location 1").subreddit("subreddit 1").id(7L).build();
        when(collegiateSubredditRepository.findById(eq(7L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(get("/api/collegiateSubreddits?id=7"))
                .andExpect(status().isOk()).andReturn();

        // assert

        verify(collegiateSubredditRepository, times(1)).findById(eq(7L));
        String expectedJson = mapper.writeValueAsString(todo1);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }


    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__put_todo() throws Exception {
        // arrange

        //User u = currentUserService.getCurrentUser().getUser();
        //User otherUser = User.builder().id(999).build();
        CollegiateSubreddit todo1 = CollegiateSubreddit.builder().name("name 1").location("location 1").subreddit("subreddit 1").id(67L).build();
        // We deliberately set the user information to another user
        // This shoudl get ignored and overwritten with currrent user when todo is saved

        CollegiateSubreddit updatedTodo = CollegiateSubreddit.builder().name("name 2").location("location 2").subreddit("subreddit 2").id(67L).build();
        CollegiateSubreddit correctTodo = CollegiateSubreddit.builder().name("name 2").location("location 2").subreddit("subreddit 2").id(67L).build();

        String requestBody = mapper.writeValueAsString(updatedTodo);
        String expectedReturn = mapper.writeValueAsString(correctTodo);

        when(collegiateSubredditRepository.findById(eq(67L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                put("/api/collegiateSubreddits?id=67")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).findById(67L);
        verify(collegiateSubredditRepository, times(1)).save(correctTodo); // should be saved with correct user
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedReturn, responseString);
    }
    

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__cannot_put_todo_that_does_not_exist() throws Exception {
        // arrange

        CollegiateSubreddit updatedTodo = CollegiateSubreddit.builder().name("New Name").location("New location").subreddit("New subreddit").id(67L).build();

        String requestBody = mapper.writeValueAsString(updatedTodo);

        when(collegiateSubredditRepository.findById(eq(67L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                put("/api/collegiateSubreddits?id=67")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isBadRequest()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).findById(67L);
        String responseString = response.getResponse().getContentAsString();
        assertEquals("CollegiateSubreddit with id 67 not found", responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__delete_todo() throws Exception {
        // arrange

        //User u = currentUserService.getCurrentUser().getUser();
        CollegiateSubreddit todo1 = CollegiateSubreddit.builder().name("Name 1").location("Location 1").subreddit("Subreddit 1").id(15L).build();
        when(collegiateSubredditRepository.findById(eq(15L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/collegiateSubreddits?id=15")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).findById(15L);
        verify(collegiateSubredditRepository, times(1)).deleteById(15L);
        String responseString = response.getResponse().getContentAsString();
        assertEquals("CollegiateSubreddit with id 15 deleted", responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__delete_todo_that_does_not_exist() throws Exception {
        // arrange

        //User otherUser = User.builder().id(98L).build();
        //CollegiateSubreddit todo1 = CollegiateSubreddit.builder().name("Name 1").location("Location 1").subreddit("Subreddit 1").id(15L).build();
        when(collegiateSubredditRepository.findById(eq(15L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/collegiateSubreddits?id=15")
                        .with(csrf()))
                .andExpect(status().isBadRequest()).andReturn();

        // assert
        verify(collegiateSubredditRepository, times(1)).findById(15L);
        String responseString = response.getResponse().getContentAsString();
        assertEquals("CollegiateSubreddit with id 15 not found", responseString);
    }



}
