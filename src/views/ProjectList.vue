<template>
  <div>
    <h2>Projects:</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/${project._id}`">{{ project.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      projects: [],
    };
  },
  created() {
    // Retrieve the user's name from the token or your authentication mechanism
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = payload.name;
      this.fetchProjects(payload.id); // Fetch projects using the user's ID
    }
  },
  methods: {
    async fetchProjects(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/project/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Projects retrieved successfully
          this.projects = data;
        } else {
          // Failed to retrieve projects, display error message
          console.error('Failed to retrieve projects:', data.error);
        }
      } catch (error) {
        // Handle network or server errors
        console.error('Error retrieving projects:', error);
      }
    },
  },
};
</script>






<!-- <template>
  <div class="p-4">
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="project in projects"
        :key="project._id"
        class="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 relative"
      >
        <div class="border h-full p-4 flex flex-col">
          <router-link
            :to="`/${project._id}`"
            class="text-blue-500 hover:underline"
            >{{ project.title }}</router-link
          >
          <p>End Date: {{ project.end_date }}</p>
          <p>Status: {{ getProjectStatus(project.end_date) }}</p>
          <div class="mt-auto">
            <button
              @click="deleteProject(project._id)"
              class="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        };

        console.log("Request Headers:", headers); // Log the headers

        const response = await fetch("http://localhost:3000/api/project", {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const projects = await response.json();
        // Handle the fetched projects data as needed
        fetch("http://localhost:3000/api/project")
          .then((response) => response.json())
          .then((data) => {
            this.projects = data;
          })
          .catch((error) => {
            console.error("Error fetching projects:", error);
          });
      } catch (error) {
        console.error(error);
      }
    },
    deleteProject(projectId) {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      fetch(`http://localhost:3000/api/project/${projectId}`, {
        method: "DELETE",
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Project deleted successfully!");
            this.projects = this.projects.filter(
              (project) => project._id !== projectId
            );
          } else {
            console.error("Failed to delete project.");
          }
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    },

    getProjectStatus(endDate) {
      const today = new Date();
      const projectEndDate = new Date(endDate);

      if (projectEndDate < today) {
        return "Overdue";
      } else {
        return "Ongoing";
      }
    },
  },
};
</script>

<style>
/* Styles for the project list */
</style> -->
