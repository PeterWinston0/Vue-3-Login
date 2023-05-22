<template>
  <div>
    <h1>Create Project</h1>
    <form @submit.prevent="createProject">
      <!-- Step 1 -->
      <div v-if="currentStep === 1">
        <div class="my-4">
          <label for="title" class="text-lg font-medium">Title:</label>
          <input
            type="text"
            id="title"
            v-model="newProject.title"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="my-4">
          <label for="description" class="text-lg font-medium"
            >Description:</label
          >
          <textarea
            id="description"
            v-model="newProject.description"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div class="my-4">
          <label for="start_date" class="text-lg font-medium"
            >Start Date:</label
          >
          <datepicker
            v-model="newProject.start_date"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></datepicker>
        </div>
        <div class="my-4">
          <label for="end_date" class="text-lg font-medium">End Date:</label>
          <datepicker
            v-model="newProject.end_date"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></datepicker>
        </div>
        <button
          type="button"
          @click="nextStep"
          class="px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Next
        </button>
      </div>
      <!-- Step 2 -->
      <div v-else-if="currentStep === 2">
        <div>
        <label for="dropbox" class="text-lg font-medium">Dropbox:</label>
        <input type="text" id="dropbox" v-model="newProject.dropbox" required class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>
      <div class="my-4">
        <label for="github" class="text-lg font-medium">Github:</label>
        <input type="text" id="github" v-model="newProject.github" required class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
      </div>
      <div class="my-4">
        <label for="tech" class="text-lg font-medium">Tech:</label>
        <input type="text" id="tech" v-model="newTech" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        <button type="button" @click="addTech" class="px-4 py-2 mt-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button>
      </div>
      <ul class="my-4">
        <li v-for="(tech, index) in newProject.techs" :key="index" class="flex items-center justify-between">
          <span>{{ tech.name }}</span>
          <button type="button" @click="removeTech(index)" class="px-2 py-1 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Remove</button>
        </li>
      </ul>
      <div class="flex justify-between">
        <button type="button" @click="prevStep" class="px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Previous</button>
        <button type="submit" class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create</button>
      </div>
      </div>
    </form>



    <!--<form @submit.prevent="createProject">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <button type="submit">Create Project</button>
    </form>-->
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      currentStep: 1,
      newProject: {
        title: "",
        description: "",
        start_date: null,
        end_date: null,
        dropbox: "",
        github: "",
        techs: [],
      },
      newTech: "",
      successMessage: "",
    };
    // return {
    //   title: "",
    //   description: "",
    // };
  },
  methods: {
    nextStep() {
      this.currentStep += 1;
    },
    prevStep() {
      this.currentStep -= 1;
    },
    addTech() {
      if (this.newTech) {
        this.newProject.techs.push({ name: this.newTech });
        this.newTech = "";
      }
    },
    removeTech(index) {
      this.newProject.techs.splice(index, 1);
    },
    async createProject() {
      const formattedStartDate = this.formatDate(this.newProject.start_date);
      const formattedEndDate = this.formatDate(this.newProject.end_date);

      // Perform form validation
      // if (!this.title || !this.description) {
      //   alert("Please fill in all fields");
      //   return;
      // }

      // Get the logged-in user ID from the token or your authentication mechanism
      const userId = this.getLoggedInUserId(); // Replace this with your implementation

        const projectData = {
          ...this.newProject,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          userId: userId,
        };

      // // Prepare the project data to be sent to the server
      // const projectData = {
      //   title: this.title,
      //   description: this.description,
      //   userId: userId,
      // };

      // Send the project data to the server to create a new project
      try {
        const response = await fetch("http://localhost:3000/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(projectData),
        });

        const data = await response.json();

        if (response.ok) {
          // Project creation successful
          console.log("Project created successfully:", data);
          // Redirect to a different page or perform additional actions
          // For example, you can use Vue Router to navigate to the project details page

      //  ---->  // const project = await response.json();
          // this.$router.push({ name: "detail", params: { id: project._id } });

          this.$router.push(`/project/${data._id}`);
        } else {
          // Project creation failed, display error message to the user
          console.error("Failed to create project:", data.error);
          alert("Failed to create project. Please try again.");
        }
      } catch (error) {
        // Handle network or server errors
        console.error("Error:", error);
        alert(
          "An error occurred while creating the project. Please try again."
        );
      }
    },
    clearForm() {
      this.newProject.title = "";
      this.newProject.description = "";
      this.newProject.start_date = null;
      this.newProject.end_date = null;
      this.newProject.dropbox = "";
      this.newProject.github = "";
      this.newProject.techs = [];
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getLoggedInUserId() {
      // Implement the logic to retrieve the logged-in user ID
      // from the token or your authentication mechanism
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case when the token is not available
        return null;
      }

      // Split the token by '.' to extract the payload
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        // Handle the case when the token is invalid
        console.error("Invalid token format");
        return null;
      }

      // Decode the payload from base64
      const payload = atob(tokenParts[1]);

      try {
        // Parse the payload as JSON to access the user ID
        const { userId } = JSON.parse(payload);
        return userId;
      } catch (error) {
        console.error("Failed to parse token payload:", error);
        // Handle the case when the payload cannot be parsed
        return null;
      }
    },
  },
};
</script>




















<!-- <template>
  <div>
    <h1>Create Project</h1>
    <form @submit.prevent="createProject">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <button type="submit">Create Project</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    async createProject() {
      // Perform form validation
      if (!this.title || !this.description) {
        alert("Please fill in all fields");
        return;
      }

      // Get the logged-in user ID from the token or your authentication mechanism
      const userId = this.getLoggedInUserId(); // Replace this with your implementation

      // Prepare the project data to be sent to the server
      const projectData = {
        title: this.title,
        description: this.description,
        userId: userId,
      };

      // Send the project data to the server to create a new project
      try {
        const response = await fetch("http://localhost:3000/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(projectData),
        });

        const data = await response.json();

        if (response.ok) {
          // Project creation successful
          console.log("Project created successfully:", data);
          // Redirect to a different page or perform additional actions
          // For example, you can use Vue Router to navigate to the project details page
          this.$router.push(`/project/${data._id}`);
        } else {
          // Project creation failed, display error message to the user
          console.error("Failed to create project:", data.error);
          alert("Failed to create project. Please try again.");
        }
      } catch (error) {
        // Handle network or server errors
        console.error("Error:", error);
        alert(
          "An error occurred while creating the project. Please try again."
        );
      }
    },
    getLoggedInUserId() {
      // Implement the logic to retrieve the logged-in user ID
      // from the token or your authentication mechanism
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case when the token is not available
        return null;
      }

      // Split the token by '.' to extract the payload
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        // Handle the case when the token is invalid
        console.error("Invalid token format");
        return null;
      }

      // Decode the payload from base64
      const payload = atob(tokenParts[1]);

      try {
        // Parse the payload as JSON to access the user ID
        const { userId } = JSON.parse(payload);
        return userId;
      } catch (error) {
        console.error("Failed to parse token payload:", error);
        // Handle the case when the payload cannot be parsed
        return null;
      }
    },
  },
};
</script> -->
