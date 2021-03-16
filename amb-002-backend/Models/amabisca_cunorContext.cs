using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace amb_002_backend.Models
{
    public partial class amabisca_cunorContext : DbContext
    {
        public amabisca_cunorContext()
        {
        }

        public amabisca_cunorContext(DbContextOptions<amabisca_cunorContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbAdministrador> TbAdministrador { get; set; }
        public virtual DbSet<TbCategoria> TbCategoria { get; set; }
        public virtual DbSet<TbCliente> TbCliente { get; set; }
        public virtual DbSet<TbClienteDireccionEnvio> TbClienteDireccionEnvio { get; set; }
        public virtual DbSet<TbDetalleInventario> TbDetalleInventario { get; set; }
        public virtual DbSet<TbDetallePedido> TbDetallePedido { get; set; }
        public virtual DbSet<TbDireccionEnvio> TbDireccionEnvio { get; set; }
        public virtual DbSet<TbEmpleado> TbEmpleado { get; set; }
        public virtual DbSet<TbFactura> TbFactura { get; set; }
        public virtual DbSet<TbInformacionPersonal> TbInformacionPersonal { get; set; }
        public virtual DbSet<TbInventario> TbInventario { get; set; }
        public virtual DbSet<TbMarca> TbMarca { get; set; }
        public virtual DbSet<TbMenu> TbMenu { get; set; }
        public virtual DbSet<TbMenuOpcion> TbMenuOpcion { get; set; }
        public virtual DbSet<TbPais> TbPais { get; set; }
        public virtual DbSet<TbPedido> TbPedido { get; set; }
        public virtual DbSet<TbPermiso> TbPermiso { get; set; }
        public virtual DbSet<TbProducto> TbProducto { get; set; }
        public virtual DbSet<TbProveedor> TbProveedor { get; set; }
        public virtual DbSet<TbRol> TbRol { get; set; }
        public virtual DbSet<TbTipoEnvio> TbTipoEnvio { get; set; }
        public virtual DbSet<TbUnidadMedida> TbUnidadMedida { get; set; }
        public virtual DbSet<TbUsuario> TbUsuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=33060;database=amabisca_cunor;Uid=root;Pwd=secret");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TbAdministrador>(entity =>
            {
                entity.HasKey(e => e.CodAdministrador)
                    .HasName("PRIMARY");

                entity.ToTable("tb_administrador");

                entity.HasIndex(e => e.CodInformacionPersonal)
                    .HasName("Reftb_informacion_personal34");

                entity.HasIndex(e => e.CodUsuario)
                    .HasName("Reftb_usuario31");

                entity.Property(e => e.CodAdministrador).HasColumnName("cod_administrador");

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<TbCategoria>(entity =>
            {
                entity.HasKey(e => e.CodCategoria)
                    .HasName("PRIMARY");

                entity.ToTable("tb_categoria");

                entity.Property(e => e.CodCategoria).HasColumnName("cod_categoria");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreCategoria)
                    .HasColumnName("nombre_categoria")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbCliente>(entity =>
            {
                entity.HasKey(e => e.CodCliente)
                    .HasName("PRIMARY");

                entity.ToTable("tb_cliente");

                entity.HasIndex(e => e.CodInformacionPersonal)
                    .HasName("Reftb_informacion_personal27");

                entity.HasIndex(e => e.CodUsuario)
                    .HasName("Reftb_usuario29");

                entity.Property(e => e.CodCliente).HasColumnName("cod_cliente");

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<TbClienteDireccionEnvio>(entity =>
            {
                entity.HasKey(e => e.CodClienteDireccionEnvio)
                    .HasName("PRIMARY");

                entity.ToTable("tb_cliente_direccion_envio");

                entity.HasIndex(e => e.CodCliente)
                    .HasName("Reftb_cliente11");

                entity.HasIndex(e => e.CodDireccionEnvio)
                    .HasName("Reftb_direccion_envio12");

                entity.Property(e => e.CodClienteDireccionEnvio).HasColumnName("cod_cliente_direccion_envio");

                entity.Property(e => e.CodCliente).HasColumnName("cod_cliente");

                entity.Property(e => e.CodDireccionEnvio).HasColumnName("cod_direccion_envio");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");
            });

            modelBuilder.Entity<TbDetalleInventario>(entity =>
            {
                entity.HasKey(e => e.CodDetalleInventario)
                    .HasName("PRIMARY");

                entity.ToTable("tb_detalle_inventario");

                entity.HasIndex(e => e.CodInventario)
                    .HasName("Reftb_inventario15");

                entity.HasIndex(e => e.CodProducto)
                    .HasName("Reftb_producto18");

                entity.HasIndex(e => e.CodProveedor)
                    .HasName("Reftb_proveedor16");

                entity.Property(e => e.CodDetalleInventario).HasColumnName("cod_detalle_inventario");

                entity.Property(e => e.CodInventario).HasColumnName("cod_inventario");

                entity.Property(e => e.CodProducto).HasColumnName("cod_producto");

                entity.Property(e => e.CodProveedor).HasColumnName("cod_proveedor");

                entity.Property(e => e.Stock).HasColumnName("stock");
            });

            modelBuilder.Entity<TbDetallePedido>(entity =>
            {
                entity.HasKey(e => e.CodDetallePedido)
                    .HasName("PRIMARY");

                entity.ToTable("tb_detalle_pedido");

                entity.HasIndex(e => e.CodPedido)
                    .HasName("Reftb_pedido20");

                entity.HasIndex(e => e.CodProducto)
                    .HasName("Reftb_producto21");

                entity.Property(e => e.CodDetallePedido).HasColumnName("cod_detalle_pedido");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.CodPedido).HasColumnName("cod_pedido");

                entity.Property(e => e.CodProducto).HasColumnName("cod_producto");
            });

            modelBuilder.Entity<TbDireccionEnvio>(entity =>
            {
                entity.HasKey(e => e.CodDireccionEnvio)
                    .HasName("PRIMARY");

                entity.ToTable("tb_direccion_envio");

                entity.Property(e => e.CodDireccionEnvio).HasColumnName("cod_direccion_envio");

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbEmpleado>(entity =>
            {
                entity.HasKey(e => e.CodEmpleado)
                    .HasName("PRIMARY");

                entity.ToTable("tb_empleado");

                entity.HasIndex(e => e.CodInformacionPersonal)
                    .HasName("Reftb_informacion_personal33");

                entity.HasIndex(e => e.CodUsuario)
                    .HasName("Reftb_usuario30");

                entity.Property(e => e.CodEmpleado).HasColumnName("cod_empleado");

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.CodigoEmpleado)
                    .HasColumnName("codigo_empleado")
                    .HasMaxLength(100);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<TbFactura>(entity =>
            {
                entity.HasKey(e => e.CodFactura)
                    .HasName("PRIMARY");

                entity.ToTable("tb_factura");

                entity.HasIndex(e => e.CodPedido)
                    .HasName("Reftb_pedido25");

                entity.Property(e => e.CodFactura).HasColumnName("cod_factura");

                entity.Property(e => e.CodPedido).HasColumnName("cod_pedido");

                entity.Property(e => e.NumeroFactura)
                    .HasColumnName("numero_factura")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TbInformacionPersonal>(entity =>
            {
                entity.HasKey(e => e.CodInformacionPersonal)
                    .HasName("PRIMARY");

                entity.ToTable("tb_informacion_personal");

                entity.HasIndex(e => e.CodPais)
                    .HasName("Reftb_pais26");

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.ApellidoPersona)
                    .HasColumnName("apellido_persona")
                    .HasMaxLength(250);

                entity.Property(e => e.CodPais).HasColumnName("cod_pais");

                entity.Property(e => e.Cui)
                    .HasColumnName("cui")
                    .HasMaxLength(18);

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(250);

                entity.Property(e => e.ImagenPerfil)
                    .HasColumnName("imagen_perfil")
                    .HasColumnType("longblob");

                entity.Property(e => e.Nit)
                    .HasColumnName("nit")
                    .HasMaxLength(250);

                entity.Property(e => e.NombrePersona)
                    .HasColumnName("nombre_persona")
                    .HasMaxLength(250);

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbInventario>(entity =>
            {
                entity.HasKey(e => e.CodInventario)
                    .HasName("PRIMARY");

                entity.ToTable("tb_inventario");

                entity.Property(e => e.CodInventario).HasColumnName("cod_inventario");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreInventario)
                    .HasColumnName("nombre_inventario")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbMarca>(entity =>
            {
                entity.HasKey(e => e.CodMarca)
                    .HasName("PRIMARY");

                entity.ToTable("tb_marca");

                entity.Property(e => e.CodMarca).HasColumnName("cod_marca");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreMarca)
                    .HasColumnName("nombre_marca")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbMenu>(entity =>
            {
                entity.HasKey(e => e.CodMenu)
                    .HasName("PRIMARY");

                entity.ToTable("tb_menu");

                entity.Property(e => e.CodMenu).HasColumnName("cod_menu");

                entity.Property(e => e.Enlace)
                    .HasColumnName("enlace")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.Icono)
                    .HasColumnName("icono")
                    .HasMaxLength(250);

                entity.Property(e => e.Inicio).HasColumnName("inicio");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasMaxLength(250);

                entity.Property(e => e.Orden).HasColumnName("orden");
            });

            modelBuilder.Entity<TbMenuOpcion>(entity =>
            {
                entity.HasKey(e => e.CodMenuOpcion)
                    .HasName("PRIMARY");

                entity.ToTable("tb_menu_opcion");

                entity.HasIndex(e => e.CodMenu)
                    .HasName("Reftb_menu2");

                entity.Property(e => e.CodMenuOpcion).HasColumnName("cod_menu_opcion");

                entity.Property(e => e.CodMenu).HasColumnName("cod_menu");

                entity.Property(e => e.Enlace)
                    .HasColumnName("enlace")
                    .HasMaxLength(10);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreMenuOpcion)
                    .HasColumnName("nombre_menu_opcion")
                    .HasMaxLength(250);

                entity.Property(e => e.Orden).HasColumnName("orden");
            });

            modelBuilder.Entity<TbPais>(entity =>
            {
                entity.HasKey(e => e.CodPais)
                    .HasName("PRIMARY");

                entity.ToTable("tb_pais");

                entity.Property(e => e.CodPais).HasColumnName("cod_pais");

                entity.Property(e => e.Acronimo)
                    .HasColumnName("acronimo")
                    .HasMaxLength(10);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NomPais)
                    .HasColumnName("nom_pais")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TbPedido>(entity =>
            {
                entity.HasKey(e => e.CodPedido)
                    .HasName("PRIMARY");

                entity.ToTable("tb_pedido");

                entity.HasIndex(e => e.CodCliente)
                    .HasName("Reftb_cliente22");

                entity.HasIndex(e => e.CodClienteDireccionEnvio)
                    .HasName("Reftb_cliente_direccion_envio23");

                entity.HasIndex(e => e.CodTipoEnvio)
                    .HasName("Reftb_tipo_envio24");

                entity.Property(e => e.CodPedido).HasColumnName("cod_pedido");

                entity.Property(e => e.CodCliente).HasColumnName("cod_cliente");

                entity.Property(e => e.CodClienteDireccionEnvio).HasColumnName("cod_cliente_direccion_envio");

                entity.Property(e => e.CodTipoEnvio).HasColumnName("cod_tipo_envio");

                entity.Property(e => e.EstadoEntrega)
                    .HasColumnName("estado_entrega")
                    .HasMaxLength(10);

                entity.Property(e => e.FechaPedido)
                    .HasColumnName("fecha_pedido")
                    .HasColumnType("date");

                entity.Property(e => e.MontoTotal)
                    .HasColumnName("monto_total")
                    .HasColumnType("decimal(10,2)");

                entity.Property(e => e.NumeroPedido)
                    .HasColumnName("numero_pedido")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TbPermiso>(entity =>
            {
                entity.HasKey(e => e.CodPermiso)
                    .HasName("PRIMARY");

                entity.ToTable("tb_permiso");

                entity.HasIndex(e => e.CodMenuOpcion)
                    .HasName("Reftb_menu_opcion3");

                entity.HasIndex(e => e.CodRol)
                    .HasName("Reftb_rol4");

                entity.Property(e => e.CodPermiso).HasColumnName("cod_permiso");

                entity.Property(e => e.CodMenuOpcion).HasColumnName("cod_menu_opcion");

                entity.Property(e => e.CodRol).HasColumnName("cod_rol");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FecActualizacion)
                    .HasColumnName("fec_actualizacion")
                    .HasColumnType("date");

                entity.Property(e => e.FechCreacion)
                    .HasColumnName("fech_creacion")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<TbProducto>(entity =>
            {
                entity.HasKey(e => e.CodProducto)
                    .HasName("PRIMARY");

                entity.ToTable("tb_producto");

                entity.HasIndex(e => e.CodCategoria)
                    .HasName("Reftb_categoria13");

                entity.HasIndex(e => e.CodMarca)
                    .HasName("Reftb_marca14");

                entity.HasIndex(e => e.CodUnidadMedida)
                    .HasName("Reftb_unidad_medida19");

                entity.Property(e => e.CodProducto).HasColumnName("cod_producto");

                entity.Property(e => e.CodCategoria).HasColumnName("cod_categoria");

                entity.Property(e => e.CodMarca).HasColumnName("cod_marca");

                entity.Property(e => e.CodUnidadMedida)
                    .IsRequired()
                    .HasColumnName("cod_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.CodigoProducto)
                    .HasColumnName("codigo_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.DetalleProducto)
                    .HasColumnName("detalle_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");

                entity.Property(e => e.FechaModificacion)
                    .HasColumnName("fecha_modificacion")
                    .HasColumnType("date");

                entity.Property(e => e.ImagenProducto)
                    .HasColumnName("imagen_producto")
                    .HasColumnType("longblob");

                entity.Property(e => e.NombreProducto)
                    .HasColumnName("nombre_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.PrecioCosto)
                    .HasColumnName("precio_costo")
                    .HasColumnType("decimal(10,2)");

                entity.Property(e => e.PrecioVenta)
                    .HasColumnName("precio_venta")
                    .HasColumnType("decimal(10,2)");

                entity.Property(e => e.UsrModificacion).HasColumnName("usr_modificacion");
            });

            modelBuilder.Entity<TbProveedor>(entity =>
            {
                entity.HasKey(e => e.CodProveedor)
                    .HasName("PRIMARY");

                entity.ToTable("tb_proveedor");

                entity.HasIndex(e => e.CodPais)
                    .HasName("Reftb_pais6");

                entity.Property(e => e.CodProveedor).HasColumnName("cod_proveedor");

                entity.Property(e => e.ApellidoProveedor)
                    .HasColumnName("apellido_proveedor")
                    .HasMaxLength(250);

                entity.Property(e => e.CodPais).HasColumnName("cod_pais");

                entity.Property(e => e.Cui)
                    .HasColumnName("cui")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.Nit)
                    .HasColumnName("nit")
                    .HasMaxLength(250);

                entity.Property(e => e.NombreProveedor)
                    .HasColumnName("nombre_proveedor")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbRol>(entity =>
            {
                entity.HasKey(e => e.CodRol)
                    .HasName("PRIMARY");

                entity.ToTable("tb_rol");

                entity.Property(e => e.CodRol).HasColumnName("cod_rol");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.Rol)
                    .HasColumnName("rol")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbTipoEnvio>(entity =>
            {
                entity.HasKey(e => e.CodTipoEnvio)
                    .HasName("PRIMARY");

                entity.ToTable("tb_tipo_envio");

                entity.Property(e => e.CodTipoEnvio).HasColumnName("cod_tipo_envio");

                entity.Property(e => e.CostoEnvio)
                    .HasColumnName("costo_envio")
                    .HasColumnType("decimal(10,2)");

                entity.Property(e => e.NombreTipoEnvio)
                    .HasColumnName("nombre_tipo_envio")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbUnidadMedida>(entity =>
            {
                entity.HasKey(e => e.CodUnidadMedida)
                    .HasName("PRIMARY");

                entity.ToTable("tb_unidad_medida");

                entity.Property(e => e.CodUnidadMedida)
                    .HasColumnName("cod_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.EstadoActivo)
                    .HasColumnName("estado_activo")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.NombreUnidadMedida)
                    .HasColumnName("nombre_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<TbUsuario>(entity =>
            {
                entity.HasKey(e => e.CodUsuario)
                    .HasName("PRIMARY");

                entity.ToTable("tb_usuario");

                entity.HasIndex(e => e.CodRol)
                    .HasName("Reftb_rol5");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.CodRol).HasColumnName("cod_rol");

                entity.Property(e => e.Contraseña)
                    .HasColumnName("contraseña")
                    .HasColumnType("blob");

                entity.Property(e => e.CorreoElectronico)
                    .HasColumnName("correo_electronico")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("date");

                entity.Property(e => e.NombreUsuario)
                    .HasColumnName("nombre_usuario")
                    .HasMaxLength(250);

                entity.Property(e => e.Salt)
                    .HasColumnName("salt")
                    .HasColumnType("blob");

                entity.Property(e => e.Token)
                    .HasColumnName("token")
                    .HasMaxLength(250);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
