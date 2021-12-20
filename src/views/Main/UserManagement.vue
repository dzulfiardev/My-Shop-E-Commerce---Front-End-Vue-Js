<template>
  <v-app>
    <v-main>
      <Navigation />
      <v-container fluid class="px-10">
        <v-overlay :value="overlayDelete">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <h1>User Management</h1>
        <v-card class="mt-5">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="loading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :search="search"
            :items="users"
            :sort-desc="true"
            :sort-by="'uid'"
            class="elevation-2"
            item-key="name"
            v-model="selected"
          >
            <!-- Dialog box -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-dialog v-model="dialog" max-width="960px">
                  <!-- Overlay Proccess -->
                  <v-overlay :value="dialogOverlay">
                    <v-progress-circular
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-overlay>

                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      @click="changeActionCreate"
                    >
                      Add New
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-form @submit.prevent="save" lazy-validation ref="form">
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Email"
                                :rules="emailRules"
                                outlined
                                dense
                                v-model="editedItem.email"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Username"
                                :rules="usernameRules"
                                outlined
                                dense
                                v-model="editedItem.username"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Full Name"
                                :rules="fullnameRules"
                                outlined
                                dense
                                v-model="editedItem.fullname"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                label="Status"
                                :items="statusItems"
                                dense
                                outlined
                                v-model="editedItem.statusValue"
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-divider
                            v-if="editedItem.action == 'update'"
                            light
                            class="mb-5"
                          ></v-divider>
                          <small v-if="editedItem.action == 'update'"
                            >Ignore Password if not changed *</small
                          >
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Password"
                                :rules="passRules"
                                outlined
                                type="password"
                                dense
                                v-model="editedItem.password"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Repeat Password"
                                :rules="passConfirmRules"
                                outlined
                                type="password"
                                dense
                                v-model="editedItem.password_confirmation"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-divider
                            light
                            class="mb-3"
                            v-if="editedItem.action == 'update'"
                          ></v-divider>

                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <div class="px-8">
                                <v-img
                                  class="my-4"
                                  width="325"
                                  height="350"
                                  :src="imgPreview"
                                  v-if="image"
                                />
                              </div>
                              <v-file-input
                                show-size
                                :rules="imageRules"
                                label="Input Photo"
                                accept="image/*"
                                prepend-icon="mdi-camera"
                                outlined
                                dense
                                v-model="editedItem.imageFile"
                                @change="updatePreview"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                label="Select Role"
                                :rules="roleRules"
                                :items="roleItems"
                                item-text="text"
                                item-value="value"
                                dense
                                outlined
                                v-model="editedItem.roleValue"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions class="py-5 px-8">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" dark @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <!-- End Dialog box -->

            <!-- Table Image -->
            <template v-slot:[`item.image`]="{ item }">
              <v-avatar class="my-2">
                <img
                  :src="item.image"
                  :alt="item.fullname"
                  style="object-fit: cover; object-position: center"
                />
              </v-avatar>
            </template>
            <!-- End Image -->

            <!-- Status -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getStatus(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <!-- End Status -->

            <!-- Action Button -->
            <template v-slot:[`item.action`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    @click="editItem(item, item.id)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit {{ item.fullname }}</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-if="
                      session.role == 'superadmin' || session.role == 'admin'
                    "
                    color="red"
                    v-on="on"
                    v-bind="attrs"
                    @click="deleteItem(item.id)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Delete {{ item.fullname }}</span>
              </v-tooltip>
            </template>
            <!-- End Action Button -->
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  title: "User Management - My Shop",
  data() {
    return {
      dialogOverlay: false,
      overlayDelete: false,
      dialog: false,
      loading: true,
      singleSelect: false,
      loggedIn: JSON.parse(localStorage.getItem("loggedIn")),
      selected: [],
      users: [],
      search: "",
      imageFile: "",
      image: "",
      imagePlaceholder: "http://via.placeholder.com/300",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "uid",
        },
        { text: "Image", value: "image" },
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
        { text: "Full Name", value: "fullname" },
        { text: "Role", value: "role" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      statusItems: ["Active", "Inactive"],
      roleItems: [],
      editedIndex: -1,
      editedItem: {
        action: "",
        email: "",
        username: "",
        fullname: "",
        statusValue: "",
        roleValue: "",
        password: "",
        password_confirmation: "",
        imageFile: null,
        oldImage: "",
      },
      usernameRules: [(v) => !!v || "Username is required"],
      emailRules: [(v) => !!v || "Email is required"],
      fullnameRules: [(v) => !!v || "Full Name is required"],
      passRules: [(v) => !!v || "Password is required"],
      passConfirmRules: [(v) => !!v || "Password Confirm is required"],
      roleRules: [(v) => !!v || "Role is required"],
      imageRules: [],
    };
  },
  components: {
    Navigation,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User Account" : "Edit User Account";
    },
    imgPreview() {
      return this.image == "" ? this.imagePlaceholder : this.image;
    },
    ...mapGetters("auth", {
      session: "getUser",
    }),
  },
  methods: {
    allUsers() {
      this.$restrictApi
        .get("/users-list/" + this.loggedIn.user.id)
        .then((res) => {
          console.log(res);
          this.users = res.data.map(this.getDisplayUsers);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allRoles() {
      this.$restrictApi
        .get("/roles")
        .then((res) => {
          this.roleItems = res.data.map(this.roleValue);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getDisplayUsers(data) {
      // Display Data on Table
      return {
        id: data.user_id,
        uid: data.user_uid,
        image: data.user_image_url,
        email: data.email,
        username: data.user_username,
        fullname: data.user_fullname,
        role: data.display_name,
        status: data.user_status,
      };
    },
    changeActionCreate() {
      this.editedItem.action = "create";
    },
    roleList(data) {
      return data.display_name;
    },
    roleValue(data) {
      return {
        text: data.display_name,
        value: data.id,
      };
    },
    getStatus(status) {
      if (status == "Active") return "green";
      else return "red";
    },
    updatePreview(payload) {
      // Preview image
      const file = payload;
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    editItem(user, id) {
      this.dialogOverlay = true;
      this.editedIndex = this.users.indexOf(user);
      this.dialog = true;
      this.editedItem.action = "update";
      this.resetValidation();

      this.$restrictApi
        .get("/users/" + id)
        .then((res) => {
          console.log(res);
          this.editedItem.id = res.data.user_id;
          this.editedItem.email = res.data.email;
          this.editedItem.username = res.data.user_username;
          this.editedItem.fullname = res.data.user_fullname;
          this.editedItem.statusValue = res.data.user_status;
          this.editedItem.roleValue = res.data.id;
          this.image = res.data.user_image_url;
          this.editedItem.oldImage = res.data.user_image;
          this.dialogOverlay = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          this.dialogOverlay = false;
        });
    },
    deleteItem(id) {
      this.overlayDelete = true;
      this.$restrictApi
        .get("/users/" + id)
        .then((res) => {
          this.overlayDelete = false;
          Swal.fire({
            title: "Are you sure?",
            html: `Are You Sure to delete Account Username: <b>${res.data.user_username}, Email: <b>${res.data.email}</b>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$restrictApi
                .delete("/users/" + id)
                .then((res) => {
                  let msg = "";
                  let title = "";
                  let icon = "";
                  if (res.data.success) {
                    title = "Success!";
                    msg = res.data.success;
                    icon = "success";
                  }
                  if (res.data.activeUser) {
                    title = "Warning!";
                    msg = res.data.activeUser;
                    icon = "warning";
                  }
                  Swal.fire(title, msg, icon);
                  this.allUsers();
                })
                .catch((err) => {
                  this.overlayDelete = false;
                  console.log(err.response);
                });
            }
          }); // End sweet Alert
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.image = "";
    },
    save() {
      if (this.loggedIn.user.role == "user") {
        return alert("You Cannot run this operate");
      }
      this.dialogOverlay = true;
      this.resetValidation();

      let form = new FormData();
      form.append("action", this.editedItem.action);
      form.append("id", this.editedItem.id);
      form.append("email", this.editedItem.email);
      form.append("user_username", this.editedItem.username);
      form.append("user_fullname", this.editedItem.fullname);
      form.append(
        "user_status",
        this.editedItem.statusValue ? this.editedItem.statusValue : ""
      );
      form.append(
        "password",
        this.editedItem.password ? this.editedItem.password : ""
      );
      form.append(
        "password_confirmation",
        this.editedItem.password_confirmation
      );
      form.append(
        "user_role",
        this.editedItem.roleValue ? this.editedItem.roleValue : ""
      );
      form.append(
        "user_image",
        this.editedItem.imageFile ? this.editedItem.imageFile : ""
      );
      form.append("old_image", this.editedItem.oldImage);

      this.$restrictApi
        .post("/create-user", form)
        .then((res) => {
          console.log(res);
          this.dialogOverlay = false;
          Swal.fire("Success", res.data.success, "success");
          this.allUsers();
          this.close();
          this.reset();
        })
        .catch((err) => {
          console.log(err.response.data);
          const error = err.response.data.error;
          this.dialogOverlay = false;

          if (error) {
            this.usernameRules = error.user_username;
            this.emailRules = error.email;
            this.fullnameRules = error.user_fullname;
            this.passRules = error.password;
            this.roleRules = error.user_role;
            this.imageRules = error.user_image;
          }
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.usernameRules = [(v) => !!v || "Username is required"];
      this.emailRules = [(v) => !!v || "Email is required"];
      this.fullnameRules = [(v) => !!v || "Full Name is required"];
      this.passRules = [(v) => !!v || "Password is required"];
      this.passConfirmRules = [(v) => !!v || "Password Confirm is required"];
      this.roleRules = [(v) => !!v || "Role is required"];
      this.imageRules = [];
    },
  },
  mounted() {
    this.allUsers();
    this.allRoles();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>

<style>
.swal2-popup {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
}
</style>